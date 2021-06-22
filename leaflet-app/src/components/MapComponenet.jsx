import React, { useState, useEffect } from 'react';
import { MapContainer, useMap, TileLayer, Marker, Popup, Polyline, useMapEvent, Circle } from 'react-leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
import DriftMarker from './DriftMarker';
import MultiPolyLine from './MultiPolyLine';
import DistancePopup from './DistancePopup';
import SearchDriftMarker from './SearchDriftMarker';

function SearchField({ getSearchPos }) {
    const provider = new GeoSearchControl({
        style: 'bar',
        provider: new OpenStreetMapProvider(),
        popupFormat: ({ query, result }) => {
            console.log(result);
            getSearchPos(result.label, result.y, result.x)
        },
        showPopup: false,
        showMarker: false
    });
    
    const map = useMap();
    
    useEffect(() => {
        map.addControl(provider);
        return () => map.removeControl(provider);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return null
}

function SearchPolyLine({ myPos, searchPos }) {
    const map = useMap();
    if(searchPos.lat === null) return null;
    const distance = Math.floor(map.distance([myPos.lat, myPos.lng], [searchPos.lat, searchPos.lng])) || 0

    return(
        <>
            <Polyline
                positions={[[myPos.lat, myPos.lng], [searchPos.lat, searchPos.lng]]}
            />
            <Circle center={[searchPos.lat, searchPos.lng]} />
            <Popup
                position={[searchPos.lat, searchPos.lng]}
                closeButton={false}
                autoClose={false}
            >
                {/* {searchPos.name} 까지의 거리: {Math.floor(map.distance([myPos.lat, myPos.lng], [searchPos.lat, searchPos.lng])) || 0} m */}
                {searchPos.name} 까지의 거리: {distance} m
            </Popup>
        </>
    )
}

function SetCenter({ center, loaded, getMyPosition }) {
    const map = useMap();
    useEffect(() => {
        if(loaded) {
            map.flyTo(center, 18);
            map.closePopup();
        }
        else map.setView(center, 18);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [loaded]);

    return null;
}

function SetPolyLine({ 
    multiPos,
    mousePos,
    drawMultiLine,
    clearMultiLine, 
    getDistance,
    getMousePos,
    getMyPosition
}) {
    const [eventStat, setEventStat] = useState(false);
    const map = useMap();
    map.locate({ watch: true, timeout: 1000 })

    useMapEvent({
        click: (e) => {
            e.originalEvent.view.L.DomEvent.preventDefault(e);
            if (eventStat === true) {
                setEventStat(false);
                clearMultiLine();
            }
            drawMultiLine(e.latlng.lat, e.latlng.lng);
            getMousePos(e.latlng.lat, e.latlng.lng);
        },
        mousemove: (e) => {
            e.originalEvent.view.L.DomEvent.preventDefault(e);
            if (eventStat === true || multiPos.length === 0) return;

            let distance = map.distance(multiPos[multiPos.length - 1], mousePos)
            getMousePos(e.latlng.lat, e.latlng.lng);
            getDistance(distance);
        },
        contextmenu: () => {
            if(eventStat === true) return;
            let distance = 0;
            multiPos.forEach((item, index) => {
                if(index >= multiPos.length - 1) return;
                distance += map.distance([item.lat, item.lng], [multiPos[index + 1].lat, multiPos[index + 1].lng]);
            });
            getMousePos(null, null);
            getDistance(distance);
            setEventStat(true);
        },
        locationfound: (e) => {
            const now = new Date(e.timestamp);
            getMyPosition(e.latlng);
            console.log(e);
            console.log(now);
        }
    });
    return null;
}

function MapComponenet({ 
    pos, 
    loaded, 
    polyState,
    drawMultiLine,
    clearMultiLine,
    getMousePos,
    getSearchPos,
    getDistance,
    getMyPosition
}) {
    const { multiPos, mousePos, distance, searchPos } = polyState;

    return (
        <MapContainer zoom={18} scrollWheelZoom={true} style={{ height: '100vh', width: '100wh', zIndex: 1 }}>
            <SearchField myPos={pos} getSearchPos={getSearchPos} />
            <SetCenter 
                center={[pos.lat, pos.lng]} 
                loaded={loaded} 
                getSearchPos={getSearchPos} 
            />
            <SetPolyLine 
                multiPos={multiPos}
                mousePos={mousePos}
                drawMultiLine={drawMultiLine}
                clearMultiLine={clearMultiLine}
                getDistance={getDistance}
                getMousePos={getMousePos}
                getMyPosition={getMyPosition}
            />
            <SearchPolyLine myPos={pos} searchPos={searchPos} />
            <DriftMarker multiPos={multiPos} /> 
            <SearchDriftMarker myPos={pos} searchPos={searchPos} />
            <MultiPolyLine multiPos={multiPos} mousePos={mousePos} />
            <DistancePopup multiPos={multiPos} mousePos={mousePos} distance={distance} />
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {
                loaded === true && (
                    <Marker position={[pos.lat, pos.lng]}>
                        <Popup>
                            내 위치
                        </Popup>
                    </Marker>
                )
            }
        </MapContainer>
    );
}

export default MapComponenet;

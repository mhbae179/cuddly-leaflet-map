import React from 'react';
import { MapState, MapDispatch } from '../contexts/MapContext';
import { PolyLineState, PolyLineDispatch } from '../contexts/PolyLineContext';
import MapComponent from '../components/MapComponenet';

function MapContainer() {
    const mapState = MapState();
    const mapDispatch = MapDispatch();
    const polyState = PolyLineState();
    const dispatch = PolyLineDispatch();

    function drawMultiLine(lat, lng) {
        dispatch({
            type: 'DRAW_MULTILINE',
            pos: {
                lat: lat,
                lng: lng
            }
        })
    }

    function clearMultiLine() {
        dispatch({
            type: 'CLEAR_MULTILINE'
        })
    }

    function getMousePos(lat, lng) {
        dispatch({
            type: 'GET_MOUSE_POS',
            pos: {
                lat: lat,
                lng: lng
            }
        })
    }

    function getSearchPos(name, lat, lng) {
        dispatch({
            type: 'GET_SEARCH_POS',
            pos: {
                name: name,
                lat: lat,
                lng: lng
            }
        })
    }

    function getDistance(distance) {
        dispatch({
            type: 'GET_DISTANCE',
            distance: distance
        })
    }

    function getMyPosition(pos) {
        mapDispatch({
            type: 'SET_VIEW',
            pos: pos
        })
    }

    return (
        <MapComponent 
            pos={mapState.pos}
            loaded={mapState.loaded}
            polyState={polyState}
            drawMultiLine={drawMultiLine}
            clearMultiLine={clearMultiLine}
            getMousePos={getMousePos}
            getSearchPos={getSearchPos}
            getDistance={getDistance}
            getMyPosition={getMyPosition}
        />
    );
}

export default MapContainer;

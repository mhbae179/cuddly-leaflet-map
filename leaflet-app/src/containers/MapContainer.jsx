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

    function addMarkingPlace(placeInfo) {
        mapDispatch({
            type: 'ADD_MARKER',
            placeInfo: placeInfo
        })
    }

    function setMarkerPos(markerPos) {
        mapDispatch({
            type: 'SET_MARKER_POS',
            markerPos: markerPos
        })
    }

    function setDrawerOpen() {
        mapDispatch({
            type: 'DRAWER_OPEN'
        })
    }

    return (
        <MapComponent 
            mapState={mapState}
            polyState={polyState}
            drawMultiLine={drawMultiLine}
            clearMultiLine={clearMultiLine}
            getMousePos={getMousePos}
            getSearchPos={getSearchPos}
            getDistance={getDistance}
            getMyPosition={getMyPosition}
            addMarkingPlace={addMarkingPlace}
            setMarkerPos={setMarkerPos}
            setDrawerOpen={setDrawerOpen}
        />
    );
}

export default MapContainer;

import React from 'react'
import { Popup } from 'react-leaflet'

function DistancePopup({ multiPos, mousePos, distance }) {
    if(multiPos.length === 0) return null;
    let position = [0, 0];
    let name = '거리';
    
    if(mousePos.lat === null) {
        position = [multiPos[multiPos.length - 1].lat, multiPos[multiPos.length - 1].lng];
        name = '총 거리'
    } else (
        position = [mousePos.lat, mousePos.lng]
    )
    return (
        <Popup 
            position={position}
            closeButton={false} 
            autoClose={false}
        >
            {name}: {Math.floor(distance) || 0} m
        </Popup>
    )
}

export default DistancePopup

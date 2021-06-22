import React from 'react';
import MenuItem from '../components/MenuItem';
import { MapDispatch } from '../contexts/MapContext';

function MenuContainer() {
    const mapDispatch = MapDispatch();

    function setPosition (lat, lng) {
        mapDispatch({
            type: 'SET_VIEW',
            pos: {
                lat: lat,
                lng: lng,
                zoom: 15
            }
        });
    }

    
    return (
        <div style={{ position: 'absolute', top: '90%', left: '45%', zIndex: 2 }}>
            <MenuItem setPosition={setPosition} />
        </div>
    );
}

export default MenuContainer;

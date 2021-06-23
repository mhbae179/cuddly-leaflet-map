import React from 'react';
import MenuItem from '../components/MenuItem';
import ToggleMarkerButton from '../components/ToggleMarkerButton';
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

    function changeMode () {
        mapDispatch({
            type: 'CHANGE_MODE'
        });
    }
    
    return (
        <div style={{ position: 'absolute', top: '90%', left: '40%', zIndex: 2 }}>
            <MenuItem setPosition={setPosition} />
            <ToggleMarkerButton changeMode={changeMode} />
        </div>
    );
}

export default MenuContainer;

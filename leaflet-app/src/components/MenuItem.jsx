import React from 'react';
import { Button } from '@material-ui/core';
import useGeoLocation from '../hooks/useGeoLocation';

function MenuItem({ setPosition }) {
    const location = useGeoLocation();

    const setPos = () => {
        const lat = location.coordinates.lat;
        const lng = location.coordinates.lng;

        setPosition(lat, lng);
    }
    
    return (
        <Button style={{ marginRight: '4px' }} color='primary' variant='outlined' onClick={setPos}>
            Get My Position
        </Button>
    );
}

export default MenuItem;

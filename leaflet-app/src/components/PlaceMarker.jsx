import React from 'react';
import { Marker, Popup } from 'react-leaflet';

function PlaceMarker({ markerPlaces }) {
    return (
        <>
            {
                markerPlaces.map((item, index) => (
                    <Marker 
                        key={`${index}_placemarker`}
                        position={[item.lat, item.lng]}
                    >
                        <Popup
                            closeButton={false} 
                            autoClose={false}
                            closeOnClick={false}
                        >
                            {item.placeName}
                        </Popup>
                    </Marker>
                ))
            }
        </>
    )
}

export default PlaceMarker;

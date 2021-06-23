import { useState } from 'react';
import { useMapEvents, Marker } from 'react-leaflet';



function AddMarker({ markingMode, open, setMarkerPos, setDrawerOpen }) {
    const [position, setPosition] = useState(null);

    useMapEvents({
        click: (e) => {
            e.originalEvent.view.L.DomEvent.preventDefault(e);
            if (markingMode === false) return null;

            if (open === true) {
                console.log('map event')
                setDrawerOpen();
                setPosition(null);
                return null;
            }
            setPosition(e.latlng);
            setMarkerPos(e.latlng);
            setDrawerOpen();
        },
    });

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

export default AddMarker;
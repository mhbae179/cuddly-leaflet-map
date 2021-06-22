import React from 'react';
import { Popup, Tooltip } from 'react-leaflet';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';

function DriftMarker({ multiPos=[] }) {
    if (multiPos.length === 0) return null;

    return (
        <>
            <ReactLeafletDriftMarker
                position={[multiPos[multiPos.length - 1].lat, multiPos[multiPos.length - 1].lng]}
                duration={1000}
                keepAtCenter={false}
            >
                <Popup>
                    이동 경로
                </Popup>
                <Tooltip>이동 경로 마커</Tooltip>
            </ReactLeafletDriftMarker>
        </>
    );
}

export default DriftMarker;

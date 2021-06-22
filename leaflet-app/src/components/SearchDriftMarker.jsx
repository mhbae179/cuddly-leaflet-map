import React from 'react';
import { Popup, Tooltip } from 'react-leaflet';
import ReactLeafletDriftMarker from 'react-leaflet-drift-marker';

function SearchDriftMarker({ myPos, searchPos }) {
    // if (searchPos.lat === null) return null;

    return (
        <>
            <ReactLeafletDriftMarker
                position={
                    searchPos.lat === null ? [myPos.lat, myPos.lng] : [searchPos.lat, searchPos.lng]
                }
                duration={1000}
                keepAtCenter={false}
            >
                <Popup>
                    검색 경로
                </Popup>
                <Tooltip>검색 경로 마커</Tooltip>
            </ReactLeafletDriftMarker>
        </>
    );
}

export default SearchDriftMarker;

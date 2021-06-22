import React from 'react';
import { Polyline, Circle } from 'react-leaflet';

function PolyLineCalc(multiPos, mousePos) {
    if (mousePos.lat === null) return multiPos;

    return multiPos.concat({ lat: mousePos.lat, lng: mousePos.lng });
}

function MultiPolyLIne({ multiPos, mousePos }) {
    if (multiPos.length === 0) return null;

    return (
        <div>
            {
                multiPos.map((data, index) => (
                    <div key={`${index}_line`}>
                        <Polyline
                            positions={PolyLineCalc(multiPos, mousePos)}
                            color='red'
                        />
                        <Circle center={[data.lat, data.lng]} />
                    </div>
                ))
            }
        </div>
    );
}

export default MultiPolyLIne;

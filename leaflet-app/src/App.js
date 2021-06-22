import { MapProvider } from './contexts/MapContext'
import { PolyLineProvider } from './contexts/PolyLineContext'
import MapContainer from './containers/MapContainer'
import MenuContainer from './containers/MenuContainer'

function App() {
  return (
    <MapProvider>
      <PolyLineProvider>
        <div style={{ position: 'relative' }}>
          <MapContainer />
          <MenuContainer />
        </div>
      </PolyLineProvider>
    </MapProvider>
  );
}

export default App;

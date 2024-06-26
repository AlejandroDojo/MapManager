import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import MapGallery from "./components/MapGallery/MapGallery";
import { Link } from "react-router-dom";
import { useState } from "react";

const Home = ({ eventos }) => {

  const [mostrarInfo, setMostrarInfo] = useState(false);

  const handleMostrarInfo = () => {
    setMostrarInfo(!mostrarInfo);
  
  };
  
  

  return (
    <>
      <div>Este es el componete de home</div>
      <div>
        <MapGallery eventos={eventos} />
      </div>

      <div className="mapContainer">
        <input type="checkbox"  onChange={handleMostrarInfo} />
        <label>Mostrar info</label>
        <MapContainer
          center={[-27.298, -55.858]}
          zoom={10}
          style={{ height: "500px", width: "500px" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {eventos.map((evento, index) => {
            return (
              <Marker
              key={`${index}-${mostrarInfo}`}
                position={[evento.location.lat, evento.location.lng]}
              >
                <Popup>
                  {evento.name} <br />
                  {evento.description} <br />
                  Empeza: 20:00 hs <hr/>
                  <Link>Ir al evento</Link>
                </Popup>
                <Tooltip direction="top" offset={[-15, -10]}   opacity={0.8}  permanent={mostrarInfo}>
                  {evento.name}
                </Tooltip>
              </Marker>
            );
          })}
        </MapContainer>
        
      </div>
    </>
  );
};

export default Home;

import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import MapGallery from "../../components/MapGallery/MapGallery";
import { Link } from "react-router-dom";
import { useState } from "react";
import styles from './Home.module.css'
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIcon, point } from "leaflet";

const Home = ({ eventos,customIcon }) => {

  const [mostrarInfo, setMostrarInfo] = useState(false);

  const handleMostrarInfo = () => {
    setMostrarInfo(!mostrarInfo);
  
  };
  const createCustomClusterIcon = function(cluster){
    return new DivIcon({
      html: `<div className="clusterIcon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33,33,true)
    })
  }
  
  

  return (
    <>
      <ul className={styles.navContainer}>
        <Link className={styles.link} to={'/'}>Home</Link>
        <Link className={styles.link} to={'/nearbyevents'}>Eventos cercanos</Link>
        <Link className={styles.link} to={'/myprofile'}>Mi perfil</Link>
        <Link className={styles.link} to={'/eventform'}>Crear Evento</Link>
      </ul>
      <div>Este es el componete de home</div>
      <div>
        <MapGallery eventos={eventos} />
      </div>

      <div className="mapContainer">
        <input type="checkbox"  onChange={handleMostrarInfo} />
        <label>Mostrar info</label>
        <MapContainer
          center={[-27.338, -55.858]}
          zoom={12}
          style={{ height: "500px", width: "calc(100% - 1rem)" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup
          chunkedLoading
          iconCreateFunction={createCustomClusterIcon}
          maxClusterRadius={30}
          polygonOptions={{
            fillColor: '#ffffff',
            color: '#0078d1',
            weight: 5,
            opacity: 1,
            fillOpacity: 0.8,
          }}
          
          >

          {eventos.map((evento, index) => {
            return (
              <Marker
                key={`${index}-${mostrarInfo}`}
                position={[evento.location.lat, evento.location.lng]}
                icon={customIcon}
              >
                <Popup>
                  {evento.name} <br />
                  {evento.description} <br />
                  Empeza: 20:00 hs <hr/>
                  <Link to={`/evento/${evento._id}`}>Ir al evento</Link>
                </Popup>
                <Tooltip direction="top" offset={[1, -20]}   opacity={0.8}  permanent={mostrarInfo}>
                  {evento.name}
                </Tooltip>
              </Marker>
            );
          })}
          </MarkerClusterGroup>
        </MapContainer>
        
      </div>
    </>
  );
};

export default Home;

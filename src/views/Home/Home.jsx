import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import MapGallery from "../../components/MapGallery/MapGallery";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from './Home.module.css'
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIcon, point} from "leaflet";
import MapCard from "../../components/MapCard/MapCard";
import axios from 'axios'
import Display from "../Display/Display";

const Home = ({ customIcon, logged, setLogged }) => {
  const token = localStorage.getItem('token');
  const remember = localStorage.getItem('remember');
  const navegar = useNavigate();
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [events, setEvents] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    if ((remember === "true") && token) {
      console.log("a'")
      console.log(token)
      axios
          .get(
            "http://localhost:8080/api/check",
            {
              headers: {
                'Content-type': 'application/json',
                'token_usuario': localStorage.getItem('token')
              },
            }
          )
          .then((info) => {
              // falta notificacion
              setLogged(true);
          })
          .catch((err) => {
            console.log(err);
            setLogged(false);
            navegar('/login')
            localStorage.removeItem('token');
            localStorage.removeItem('remember');
          });
    }    
    axios.get('http://localhost:8080/api/getEvents')
                .then((res)=> {
                  setEvents(res.data)
                  setLoading(true)}
                )
                .catch(err => console.log(err))
  }, [])

  if(!logged) {
    return <Display />
  }
  

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



  if(!loading){
    return <div>Cargando...</div>
  }
  
 
  return (
    <>
      <div>Este es el componete de home</div>
      <div>
        <MapGallery eventos={events} />
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

          {events.map((evento, index) => {
            return (
              <Marker
                key={`${index}-${mostrarInfo}`}
                position={[evento.location[0], evento.location[1]]}
                icon={customIcon}
              >
                <Popup className="popup" autoPan={true} >
                  
                  <MapCard name={evento.name} description={evento.description} imageUrl={evento.imageUrl}/> <hr/>
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

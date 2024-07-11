import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {format} from 'date-fns'
import styles from "./EventDetail.module.css";
import axios from "axios";
import MapCard from "../../components/MapCard/MapCard";
import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";

const EventDetail = ({customIcon, añadirAsistencia}) => {
  const [evento, setEvento] = useState({});
  const [loaded, setLoaded] = useState(false);
  const { id } = useParams();
  const [showModal, setShowModal]= useState(false)

  useEffect(() => {
    axios
      .get(`http://localhost:8080/api/getEvent/${id}`)
      .then((res) => {
        setEvento(res.data);
        setLoaded(true);
      })
      .catch((err) => console.log(err));
  }, []);

  const actualizarCalendario=()=>{
    //llamar a la funcion y enviarle el id del evento para añadir al calendario 
    añadirAsistencia(evento)
    setShowModal(true)
  }
  
  if (!loaded) {
    return <div>Cargando...</div>;
  }

  return (
    <div className={styles.container}>
    
    <div className={styles.containerDetail}>
      <div className={styles.containerDetailImg}>
        <img
          className={styles.imgEjemplo}
          src={evento.imageUrl}
          alt={evento.name}
        />
      </div>
      <div className={styles.containerDetailInfo}>
        <h3>Nombre del evento: {evento.name}</h3>
        <div className={styles.typeContainer}>
          <div>
            <h4>Tipo:</h4>
          </div>

          <ul>
            {evento.type.map((type, index) => {
              return <li key={index}>{type}</li>;
            })}
          </ul>
        </div>
        <p>Descripcion: {evento.description}</p>
        {!evento.startDate ? "" : <p>Fecha de inicio: {format(evento.startDate, "HH:mm | dd MMM yyyy")}</p>}
        {!evento.endDate ? "" : <p>Fecha de fin: {format(evento.endDate, "HH:mm | dd MMM yyyy")}</p>}
        {!evento.price ? "" : <p>Precio: {evento.price}</p>}
        {!evento.startDate ? ""
        :<>
        <div className='botonModal' >
        <label htmlFor='btnModal'  className='btnACModal'  onClick={actualizarCalendario} >Asisitir al evento</label>
        </div>
        <input type='checkbox'  id='btnModal'  style={{display: 'none'}} ></input>
        {showModal
          ? <section id="containerModal"  className={styles.containerModal} >
              <div className={styles.contentModal}>
                <h2>Evento añadido!</h2>
                <p>Se ha añadido el evento  <span className={styles.span} >{evento.name}</span> a tu calendario</p>
                {/*despues con una libreria para añadir un botoncito en la derecha superior para cerrar el modal */}
                <div className='btnCerrar' >
                  <label htmlFor='btnModal' onClick={()=>{setShowModal(false)}}  >Cerrar</label>         
                </div>
              </div>
            </section>
            : ""
        }
        </>}
        
      </div>

    </div>
      <div className={styles.mapContainer}>

        <MapContainer
          center={[evento.location[0], evento.location[1]]}
          zoom={15}
          style={{ height: "400px", width: "100%" }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <Marker
            position={[evento.location[0], evento.location[1]]}
            icon={customIcon}
          >
            <Popup className="popup" autoPan={true}>
              <MapCard
                name={evento.name}
                description={evento.description}
                imageUrl={evento.imageUrl}
              />
            
              
            </Popup>
            <Tooltip
              direction="top"
              offset={[1, -20]}
              opacity={0.8}

            >
              {evento.name}
            </Tooltip>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};

export default EventDetail;

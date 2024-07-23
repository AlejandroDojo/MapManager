import { MapContainer, Marker, Popup, TileLayer, Tooltip } from "react-leaflet";
import MapGallery from "../../components/MapGallery/MapGallery";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import styles from "./Home.module.css";
import MarkerClusterGroup from "react-leaflet-cluster";
import { DivIcon, point } from "leaflet";

import MapCard from "../../components/MapCard/MapCard";
import axios from "axios";
import Display from "../Display/Display";
import NearbyEvents from "../NearbyEvents/NearbyEvents";
import AssignedEvents from "../../components/AssignedEvents/AssignedEvents";
import Title from "../../components/Title/Title";

const Home = ({ customIcon, logged, setLogged }) => {
  const mapRef = useRef(null);
  const [mostrarInfo, setMostrarInfo] = useState(false);
  const [events, setEvents] = useState({});
  const [loading, setLoading] = useState(false);
  const [setAll, setSetAll] = useState(true);
  const [some, setSome] = useState(false);
  const [eventClick, setEventClick] = useState(null);

  useEffect(() => {
    axios
      .get("https://mapmanager-backend.onrender.com/api/getEvents")
      .then((res) => {
        const filteredEvents = res.data.filter(
          (event) => Date.parse(event.endDate) > Date.now()
        );

        setEvents(filteredEvents);

        setLoading(true);
      })
      .catch((err) => console.log(err));
  }, []);

  if (!logged) {
    return <Display setLogged={setLogged} />;
  }

  const handleMostrarInfo = () => {
    setMostrarInfo(!mostrarInfo);
  };
  const createCustomClusterIcon = function (cluster) {
    return new DivIcon({
      html: `<div className="clusterIcon">${cluster.getChildCount()}</div>`,
      className: "custom-marker-cluster",
      iconSize: point(33, 33, true),
    });
  };

  if (!loading) {
    return <div>Cargando...</div>;
  }
  const scrollToSection = (ref, lat, lon) => {
    ref.current.scrollIntoView({ behavior: "smooth" });
    setEventClick([lat, lon]);
  };

  const handleNavClickAll = () => {
    if (setAll !== true) {
      setSetAll(true);
      setSome(false);
    }
  };
  const handleNavClickSome = () => {
    if (some !== true) {
      setSome(true);
      setSetAll(false);
    }
  };

  return (
    <>
      <div className={styles.Container}>
        <Title text="Eventos" />
        <div className={styles.buttonsContainer}>
          <button
            className={`${styles.buttonAll} ${setAll ? styles.active : ""}`}
            onClick={handleNavClickAll}
          >
            Todos
          </button>
          <button
            className={`${styles.buttonSome} ${some ? styles.active : ""}`}
            onClick={handleNavClickSome}
          >
            Cercanos
          </button>
        </div>
      </div>
      <div>
        {setAll ? (
          <MapGallery
            eventos={events}
            handleClick={scrollToSection}
            referencia={mapRef}
          />
        ) : (
          ""
        )}
        {some ? (
          <NearbyEvents handleClick={scrollToSection} referencia={mapRef} />
        ) : (
          ""
        )}
      </div>
      <hr />
      <div className={styles.checkboxContainer}>
        <h1>Explora eventos en otras partes del mundo</h1>

        <div>
          <label>Mostrar info</label>
          <input type="checkbox" onChange={handleMostrarInfo} />
        </div>
      </div>

      <div className="mapContainer" ref={mapRef}>
        <MapContainer
          key={eventClick}
          center={eventClick || [-27.338, -55.858]}
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
              fillColor: "#ffffff",
              color: "#0078d1",
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
                  <Popup className="popup" autoPan={true}>
                    <MapCard
                      _id={evento._id}
                      name={evento.name}
                      description={evento.description}
                      imageUrl={evento.imageUrl}
                      start={evento.startDate}
                    />{" "}
                  </Popup>
                  <Tooltip
                    direction="top"
                    offset={[1, -20]}
                    opacity={0.8}
                    permanent={mostrarInfo}
                  >
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

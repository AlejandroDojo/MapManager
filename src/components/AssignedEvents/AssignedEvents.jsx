import axios from "axios";
import { useEffect, useState } from "react";
import Title from "../Title/Title";
import MapGallery from "../MapGallery/MapGallery";

const AssignedEvents = ({handleClick, referencia}) => {
  const [assignedEvents, setAssignedEvents] = useState([]);
  const llamadaInicial = async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/user/eventosdeusuario/${localStorage.getItem(
          "token"
        )}`
      );
      let eventosID = data;
      if (eventosID) {
        const eventosPromises = eventosID.map(async (idDeEvento) => {
          const { data } = await axios.get(
            `http://localhost:8080/api/getEvent/${idDeEvento}`
          );
          return data;
        });
        const eventos = await Promise.all(eventosPromises);
        setAssignedEvents(eventos);
      } else {
        console.log("Aun no ha indicado asistir a algún evento");
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    llamadaInicial();
  }, []);

  return (
    <>
      <Title text="Eventos a los que estoy asignado" />
      {assignedEvents ? <MapGallery eventos={assignedEvents} handleClick={handleClick} referencia={referencia}/> : ""}
    </>
  );
};

export default AssignedEvents;

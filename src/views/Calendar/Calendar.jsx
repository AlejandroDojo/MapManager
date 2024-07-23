import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import "./Calendar.css";
import "dayjs/locale/es";
import { useEffect, useState } from "react";
import axios from "axios";
import EventModal from "../EventModal/EventModal";

const FCallendar = () => {
  const [eventoSeleccionado, setEventoSeleccionado] = useState(null);
  const [eventosUsuario, setEventosUsuario] = useState([]);
  const [misEventosdelMes, setMisEventosdelMes] = useState([]);
  const [mesSeleccionado, setMesSeleccionado] = useState([]);

  let eventosAMostrar = [];

  const traerEventosdelMes = async () => {
    try {
      const { data } = await axios.get(
        `https://mapmanager-backend.onrender.com/api/user/eventosdeusuario/${localStorage.getItem('token')}`
      );
      console.log(data);

      if (data) {
        const eventosPromises = data.map(async (idDeEvento) => {
          const { data } = await axios.get(
            `https://mapmanager-backend.onrender.com/api/getEvent/${idDeEvento}`
          );
          return {
            start: dayjs(data.startDate).toDate(),
            end: dayjs(data.endDate).toDate(),
            title: data.name,
            data: {
              descripcion: data.description,
            },
          };
        });
        const eventos = await Promise.all(eventosPromises);
        setEventosUsuario(eventos);
      } else {
        console.log("Aun no ha indicado asistir a algún evento");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleEventClick = (evento) => {
    setEventoSeleccionado(evento);
    console.log(evento);
  };

  const handleEventClose = () => {
    setEventoSeleccionado(null);
  };

  useEffect(() => {
    traerEventosdelMes();
  }, [mesSeleccionado]);

  dayjs.locale("es");
  const localizer = dayjsLocalizer(dayjs);
  return (
    <div>
      {/* {eventosAMostrar.length===0 ? <p>Cargando....</p>
            :          */}
      <div className="calendarContainer">
        <Calendar
          localizer={localizer}
          events={eventosUsuario}
          views={["month", "week", "day"]}
          messages={{
            next: "Siguiente",
            previous: "Anterior",
            today: "Hoy",
            month: "Mes",
            week: "Semana",
            day: "Dia",
          }}
          onSelectEvent={handleEventClick}
        />
        {eventoSeleccionado && (
          <EventModal evento={eventoSeleccionado} onClose={handleEventClose} />
        )}
      </div>
      {/* } */}
    </div>
  );
};

export default FCallendar;

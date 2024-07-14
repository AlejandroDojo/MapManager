import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import  './Calendar.css'
import "dayjs/locale/es"
import { useEffect, useState } from "react";
import axios from "axios";
import EventModal from "../EventModal/EventModal";


const FCallendar=({eventos, email})=>{
    const [eventoSeleccionado, setEventoSeleccionado]=useState(null)
    const [eventosUsuario, setEventosUsuario]= useState([])
    let eventosAMostrar=[];

    const handleEventClick=(evento)=>{
        setEventoSeleccionado(evento)
        console.log(evento)
    }

    const handleEventClose=()=>{
        setEventoSeleccionado(null)
    }

    useEffect(()=>{
        const fetchEventos = async () => {
            try {
                const { data } = await axios.get(`http://localhost:8080/api/user/unique/${email}`);
                if (data.assignedEvents) {
                    const eventosPromises = data.assignedEvents.map(async (idDeEvento) => {
                        const { data } = await axios.get(`http://localhost:8080/api/getEvent/${idDeEvento}`);
                        return {
                            start: dayjs(data.startDate).toDate(),
                            end: dayjs(data.endDate).toDate(),
                            title: data.name,
                            data: {
                                descripcion: data.description
                            }
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

        fetchEventos();
    }, [email]); // Dependencia para que se ejecute solo cuando cambie el email
        // axios
        // .get(`http://localhost:8080/api/user/unique/${email}`)
        // .then(({data})=>{
        //     if(data.assignedEvents){
        //         data.assignedEvents.map((idDeEvento)=>{
        //             axios
        //             .get(`http://localhost:8080/api/getEvent/${idDeEvento}`)
        //             .then(({data})=>{
                        
        //                 let nuevoEvento={
        //                     start: dayjs(data.startDate).toDate(),
        //                     end: dayjs(data.endDate).toDate(),
        //                     title: data.name,
        //                     data: {
        //                       descripcion: data.description
        //                     }
                        
        //                 }
        //                 eventosAMostrar.push(nuevoEvento)
        //                 //   let eventos=[...eventosUsuario, nuevoEvento]
        //                 //   setEventosUsuario(eventos)
                        
        //             })
                    
        //         })
        //         console.log(eventosAMostrar)
            
            
        //     }
        //     else{
        //         console.log("Aun no ha indicado asistir a algun evento")
        //     }
        // })
        // .catch((err)=>console.log(err))
    //})
    dayjs.locale("es");
    const localizer= dayjsLocalizer(dayjs)
    return(
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
                month:"Mes",
                week: "Semana",
                day:"Dia"
            }}
            onSelectEvent={handleEventClick}

        /> 
        {eventoSeleccionado && (
            <EventModal 
            evento={eventoSeleccionado}
            onClose={handleEventClose}
            />
        )}
        </div>
        {/* } */}
        </div>

    )
}

export default FCallendar;
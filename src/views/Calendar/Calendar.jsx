import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import  './Calendar.css'
import "dayjs/locale/es"
import { useState } from "react";


const FCallendar=()=>{
    dayjs.locale("es");
    const localizer= dayjsLocalizer(dayjs)
    const myEventsList=[
        {
            start: dayjs("2024-07-10T12:00:00").toDate(),
            end: dayjs("2024-07-11T12:00:00").toDate(),
            title: "Evento 1"
        },
        {
            start: dayjs("2024-07-8T09:00:00").toDate(),
            end: dayjs("2024-07-8T10:00:00").toDate(),
            title: "Evento 2"
        }

    ]

    return(
        <div className="calendarContainer">
            <Calendar 
                localizer={localizer}
                events={myEventsList}
                views={["month", "week", "day"]}
                defaultView="week"
                messages={{
                    next: "Siguiente",
                    previous: "Anterior",
                    today: "Hoy",
                    month:"Mes",
                    week: "Semana",
                    day:"Dia"
                }}

            />
        </div>
    )
}

export default FCallendar;
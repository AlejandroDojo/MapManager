import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import  './Calendar.css'
import "dayjs/locale/es"
import { useState } from "react";


const FCallendar=({eventos})=>{


    dayjs.locale("es");
    const localizer= dayjsLocalizer(dayjs)
    return(
        <div className="calendarContainer">
            <Calendar 
                localizer={localizer}
                events={eventos}
                views={["month", "week", "day"]}
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
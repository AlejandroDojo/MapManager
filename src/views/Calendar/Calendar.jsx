import { Calendar, dayjsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";

const FCallendar=()=>{
    const localizer= dayjsLocalizer(dayjs)
    const myEventsList=[
        {
            start: dayjs("2024-07-10T12:00:00").toDate(),
            end: dayjs("2024-07-11T12:00:00").toDate(),
            title: "Evento 1"
        }
    ]

    return(
        <div>
            <Calendar 
                localizer={localizer}
                events={myEventsList}
            />
        </div>
    )
}

export default FCallendar;
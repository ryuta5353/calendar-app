import React from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import jaLocale from "@fullcalendar/core/locales/ja"

const Calendar = ({schedules})=>{
    
    const events = schedules.map((schedule)=>({
        id:schedule.id,
        title:schedule.title,
        start: schedule.start_datetime,
        end:schedule.end_datetime
    }))
    return (
        <FullCalendar
            plugins={[dayGridPlugin]}
            initialView="dayGridMonth"
            locales={[jaLocale]}
            locale="ja"
            events={events}
            />
    )
}

export default Calendar;
import React, { useRef, useEffect, useState, useContext } from 'react';
import DisplayEvents from './DisplayEvents';
import { HolidayDataContext } from './Home'


function DayDiv({ dayArr, isToday }) {
    const data = useContext(HolidayDataContext);

    const dayRef = useRef([]);

    const [eventsDiv, setEventsDiv] = useState({ display: false, divId: null, endOfWeek: null, divRect: null });
    const [events, setEvents] = useState(null);


    useEffect(() => {
        dayRef.current = dayRef.current.slice(0, dayArr.length);
    }, [dayArr]);

    const toggleEvents = (current, index) => {
        // console.log(dayRef.current[index].id)
        let saturday = null;
        if (current.$W != 6) {
            saturday = `${String(current.add(6 - current.$W % 6, "day").$M) + String(current.add(6 - current.$W % 6, "day").$D)}`;
        } else saturday = `${String(current.$M) + String(current.$D)}`;

        if (eventsDiv.divId === dayRef.current[index].id) {
            setEventsDiv(eventsDiv => { return { ...eventsDiv, display: !eventsDiv.display } });
        } else if (!eventsDiv.display) {
            setEventsDiv(eventsDiv => { return { ...eventsDiv, display: true } });
        }
        setEventsDiv(eventsDiv => { return { ...eventsDiv, divId: dayRef.current[index].id, endOfWeek: saturday, divRect: dayRef.current[index].getBoundingClientRect() } });
        setEvents(dayRef.current[index].childNodes[2].childNodes);
    }


    const days = dayArr.map(({ current, prefix }, index) => {
        let indexHolder = -1;
        let holidays = [];
        for (let i = 0; i < data.length; i++) {
           holidays = holidays.concat(data[i].map((holidate) => {
                if (isToday(current, holidate)) {
                    return (<span key={`${holidate.countryId + holidate.name}`} className={`${holidate.color} square`} data-name={`${holidate.name}`} data-color={`${holidate.color}`} data-descript={`${holidate.description}`}></span>)
                }
            })).filter((ele) => ele!=undefined)
        }

        return (
            <>
                <div className={`day ${prefix}`} id={`${String(current.$M) + String(current.$D)}`} onClick={() => toggleEvents(current, index)} key={`${String(current.$M) + String(current.$D)}`} ref={(el) => dayRef.current[index] = el}>
                    <div className='day-name'>
                        {current.format('ddd')}
                    </div>
                    <div className='day-number'>
                        {current.$D}
                    </div>
                    <div className='day-events'>
                        {holidays}
                    </div>
                </div>
                {`${String(current.$M) + String(current.$D)}` === eventsDiv.endOfWeek && eventsDiv.display ? <DisplayEvents divRect={eventsDiv.divRect} data={data} events={events}/> : null}
            </>
        )
    })



    return (
        days
    )
}

export default DayDiv;

import React, { useRef, useEffect, useState, useContext } from 'react';
import DisplayEvents from './DisplayEvents';
import { DataContext } from './Home'


function DayDiv({ dayArr , isToday}) {
    const data = useContext(DataContext);
    const dayRef = useRef([]);

    const [eventsDiv, setEventsDiv] = useState({ display: false, divId: null, endOfWeek: null, divRect: null });

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
            setEventsDiv({ display: !eventsDiv.display, divId: dayRef.current[index].id, endOfWeek: saturday, divRect: dayRef.current[index].getBoundingClientRect() });
        } else {
            if (!eventsDiv.display) {
                setEventsDiv({ display: true, divId: dayRef.current[index].id, endOfWeek: saturday, divRect: dayRef.current[index].getBoundingClientRect() })
            } else setEventsDiv({ ...eventsDiv, divId: dayRef.current[index].id, endOfWeek: saturday, divRect: dayRef.current[index].getBoundingClientRect() })
        }


    }

    return (
        dayArr.map(({ current, prefix }, index) => {
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
                            {data.map((ele, index) => {
                                if (isToday(current,ele)) {
                                    return <span className="orange"></span>
                                }
                            })}
                        </div>
                    </div>
                    {`${String(current.$M) + String(current.$D)}` === eventsDiv.endOfWeek && eventsDiv.display ? <DisplayEvents divRect={eventsDiv.divRect} /> : null}
                </>
            )
        })
    )
}

export default DayDiv;

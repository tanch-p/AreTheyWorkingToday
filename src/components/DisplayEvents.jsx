import React, { useState, useEffect } from "react";

const DisplayEvents = ({ divRect, data, events }) => {
    const [eventSpan, setEventSpan] = useState(null);
    const [hover, setHover] = useState(false);
    const [tooltip, setTooltip] = useState(null);

    // console.log(divRect);

    const arrowStyle = {
        left: "90%"
    }

    const handleHover = (descript = "") => {
        if (descript !== "") {
            setHover(true);
            setTooltip(descript);
            console.log(descript);
        }
        else {
            console.log("out");
            setHover(false)
        }
    }

    useEffect(() => {
        if (events.length !== 0) {
            const returnArr = [];
            for (let i = 0; i < events.length; i++) {
                returnArr.push(
                    <>
                        <div className={`event-category ${events[i].dataset.color}`} key={events[i].dataset.id + "cat"}></div>
                        <span onMouseOver={() => handleHover(events[i].dataset.descript)} onMouseOut={() => handleHover("")} key={events[i].dataset.id + "span"}>{events[i].dataset.id.toUpperCase() + ": " + events[i].dataset.name}</span>
                    </>)
            }
            setEventSpan(returnArr);

        } else setEventSpan(<span>No events today</span>)
    }, [events]);


    return (
        <>
            <div className="details in">
                <div className="arrow" style={arrowStyle}></div>
                <div className="events in no-scrollbar">
                    <div className="event no-scrollbar">
                        {eventSpan}
                    </div>
                </div>

            </div>
            {hover ? <div className={`absolute left-500 top-500`}>{tooltip}</div> : null}
        </>
    )
};

export default DisplayEvents;

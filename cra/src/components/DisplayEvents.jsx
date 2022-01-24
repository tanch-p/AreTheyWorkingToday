import React from "react";

const DisplayEvents = ({ divRect, data}) => {

    // console.log(index);


    console.log(divRect);

    const arrowStyle = {
        left: divRect?.left + divRect?.width * 0.44
    }
    return (
        <div className="details in">
            <div className="arrow" style={arrowStyle}></div>
            <div className="events in">
                <div className="event">
                    {true ? <><div className="event-category orange"></div>
                        <span>{data.name}</span></> : <span>No events today</span>}

                </div>
            </div>
        </div>
    )
};

export default DisplayEvents;

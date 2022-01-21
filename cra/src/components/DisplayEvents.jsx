import React from "react";

const DisplayEvents = ({ divRect, data, index }) => {

    // console.log(index);



    const arrowStyle = {
        left: divRect?.left + divRect?.width * 0.44
    }
    return (
        <div className="details in">
            <div className="arrow" style={arrowStyle}></div>
            <div className="events in">
                <div className="event">
                    {index !== -1 ? <><div className="event-category orange"></div>
                        <span>{data[index].name}</span></> : <span>No events today</span>}

                </div>
            </div>
        </div>
    )
};

export default DisplayEvents;

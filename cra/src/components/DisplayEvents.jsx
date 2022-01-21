import React, { useContext } from "react";
import { DataContext } from './Home'

const DisplayEvents = ({ divRect }) => {
    // console.log(divRect);
    const dataContext = useContext(DataContext);
    console.log(dataContext);

    const arrowStyle ={
       left: divRect?.left+divRect?.width*0.44
    }

    return (
        <div className="details in">
            <div className="arrow" style={arrowStyle}></div>
            <div className="events in">"hi"</div>
        </div>
    )
};

export default DisplayEvents;

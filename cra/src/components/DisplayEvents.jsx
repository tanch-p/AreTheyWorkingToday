const DisplayEvents = ({ divRect }) => {
    // console.log(divRect);

    const arrowStyle ={
       left: divRect.left+divRect.width*0.44
    }

    return (
        <div className="details in">
            <div className="arrow" style={arrowStyle}></div>
            <div className="events in">"hi"</div>
        </div>
    )
};

export default DisplayEvents;

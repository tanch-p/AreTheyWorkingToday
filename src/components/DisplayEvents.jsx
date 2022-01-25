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

    const getHolidayQuery = (descript, name) => {

        let isDay = false;
        let isDayOff = false;
        let dayIndex = 0;

        const keywords = [{ keyword: "Spring Festival", query: "Spring Festival" }, { keyword: "Golden Week", query: "Golden Week" }, { keyword: "Chinese Lunar New Year's Day", query: "Chinese New Year" }];
        for (const { keyword, query } of keywords) {
            if (name.includes(keyword)) {
                return query;
            }
        }

        let words = descript.split(" ");
        for (let i = 0; i < 7 && i < words.length; i++) {
            if (words[i] === "Day") {
                if (i !== 1 && i <= 5) {
                    dayIndex = i;
                    isDay = true;
                    break;
                } else if (i === 1) {
                    isDayOff = true;
                }
            } else continue;
        }
        if (isDay) {
            return isDayOff ? words.slice(3, dayIndex + 1).join(" ") : words.slice(0, dayIndex + 1).join(" ")
        } else {
            if (name.includes("/")) {
                return name.split("/")[0].trim();
            }
        }
    }

    const getWikiUrl = (query) => {

        const makeApiCall = async (API_URL) => {
            const res = await fetch(API_URL);
            const data = await res.json();
            return (Object.keys(data.query.pages)[0]);
        };

        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&titles=${query}`
        return makeApiCall(url);
    }


    useEffect(() => {
        if (events.length !== 0) {
            const returnArr = [];
            for (let i = 0; i < events.length; i++) {

                let pageId = null; 
                try {
                    pageId = getWikiUrl(getHolidayQuery(events[i].dataset.descript, events[i].dataset.name));
                } catch (e) {
                    console.log(e);
                }

                pageId !== null || pageId !== -1 ? console.log(pageId) : console.log("????");

                returnArr.push(
                    <>
                        <div className={`event-category ${events[i].dataset.color}`} key={events[i].dataset.id + "cat"}></div>
                        <span className="hover:text-blue-600 hover:underline" onMouseOver={() => handleHover(events[i].dataset.descript)} onMouseOut={() => handleHover("")} key={events[i].dataset.id + "span"}>{events[i].dataset.id.toUpperCase() + ": " + events[i].dataset.name}</span>
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

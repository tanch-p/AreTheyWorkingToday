import React, { useState, useEffect } from "react";
// import ReactCSSTransitionGroup from 'react-transition-group';

const DisplayEvents = ({ divRect, data, events, }) => {
    const [eventsDiv, setEventsDiv] = useState(null);
    const [links, setLinks] = useState([]);
    // console.log(divRect);

    const arrowStyle = {
        left: "90%"
    }

    const getHolidayQuery = (name) => {

        const keywords = [{ keyword: "Spring Festival", query: "Spring Festival" }, { keyword: "Golden Week", query: "Golden Week" }, { keyword: "Chinese Lunar New Year's Day", query: "Chinese New Year" }, { keyword: "Good Friday", query: "Good Friday" }, { keyword: "Day off for", query: name.split(" ").slice(3).join(" ") }, { keyword: "Sea Day", query: "Marine Day" }];
        for (const { keyword, query } of keywords) {
            if (name.includes(keyword)) {
                return query;
            }
        }

        if (name.includes("/")) {
            return name.split("/")[0].trim();
        } else return name;
    }

    const getWikiUrl = (query, i) => {
        console.log(query);
        const makeApiCall = async (API_URL) => {
            const res = await fetch(API_URL);
            const data = await res.json();
            const pageId = Object.keys(data.query.pages)[0];
            console.log("pageId", pageId);
            // console.log(API_URL);
            return (
                <>
                    <div className={`event-category ${events[i].dataset.color}`} key={events[i].dataset.name + "cat"}></div>

                    {pageId !== -1 ? <span className="text-blue-600 underline" key={events[i].dataset.name + "span"}><a href={`https://en.wikipedia.org/?curid=${pageId}`} target="_blank" rel="noreferrer noopener"> {events[i].dataset.id.toUpperCase() + ": " + events[i].dataset.name}  </a></span> : <span key={events[i].dataset.name + "span"}>{events[i].dataset.id.toUpperCase() + ": " + events[i].dataset.name}</span>}
                </>
            )
        };

        const url = `https://en.wikipedia.org/w/api.php?action=query&prop=categories&format=json&titles=${query}&origin=*`
        return makeApiCall(url);
    }

    useEffect(() => {
        setLinks([]);
        if (events.length !== 0) {

            for (let i = 0; i < events.length; i++) {
                try {
                    let pagePromise = getWikiUrl(getHolidayQuery(events[i].dataset.name), i);
                    // console.log("pageIdPromise", pagePromise);
                    pagePromise.then(value => {
                        setLinks(links => [...links, ...value.props.children]);
                    });
                } catch (e) {
                    console.log(e);
                }
            }
        }
    }, [events]);

    useEffect(() => {
        let returnArr = [];
        for (const link of links) {
            returnArr.push(link);
        }
        returnArr.length !== 0 ? setEventsDiv(returnArr) : setEventsDiv(<span>No events today</span>) 
    }, [links])

    return (
        <>
            <div className="details in">
                <div className="arrow" style={arrowStyle}></div>
                <div className="events in no-scrollbar">
                    <div className="event no-scrollbar">
                        {eventsDiv}
                    </div>
                </div>

            </div>
        </>
    )
};

export default DisplayEvents;

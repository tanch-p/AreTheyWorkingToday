import React, { useState, createContext } from 'react'
import Calender from './Calender'

let SG2022_data = require("../testdata/holidays-sg-2022.json");
// console.log(SG2022_data.response.holidays);
export const DataContext = createContext();

const parseData = (data) => {
    return data.map((holidayData, index) => {
        if (holidayData.type[0] === "National holiday") {
            return ({ countryId: holidayData.country.id, name: holidayData.name, description: holidayData.description, $D: holidayData.date.datetime.day, $M: holidayData.date.datetime.month - 1, $y: holidayData.date.datetime.year})
        }
    })
}

const parseCountryData = (data) => {
    
}

const Home = () => {
    const data = parseData(SG2022_data.response.holidays).filter((ele) => ele !== undefined);
    // console.log(data);
    
    return (
        <div>
            <h1>Home</h1>
            <DataContext.Provider value={data}>
                <Calender />
            </DataContext.Provider>
        </div>
    )
}


export default Home

import React, { useState, createContext } from 'react'
import Calender from './Calender'

let SG2022_data = require("../testdata/holidays-sg-2022.json");
// console.log(SG2022_data.response.holidays);
export const DataContext = createContext();

const Home = () => {
    return (
        <div>
            <h1>Home</h1>
            <DataContext.Provider value={SG2022_data.response.holidays}>
                <Calender />
            </DataContext.Provider>
        </div>
    )
}


export default Home

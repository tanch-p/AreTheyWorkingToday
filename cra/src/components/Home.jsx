import React, {createContext } from 'react'
import Calender from './Calender'
import CountryForm from './CountryForm'

const SG2022_data = require("../testdata/holidays-sg-2022.json");
const countries = require("../testdata/countries.json") 
// console.log(SG2022_data.response.holidays);
export const DataContext = createContext();

const parseData = (data) => {
    return data.map((holidayData, index) => {
        if (holidayData.type[0] === "National holiday") {
            return ({ countryId: holidayData.country.id, name: holidayData.name, description: holidayData.description, $D: holidayData.date.datetime.day, $M: holidayData.date.datetime.month - 1, $y: holidayData.date.datetime.year })
        } else return undefined
    })
}

const parseCountryData = (data) => {
    return data.map((countryData, index) => {
        return(`${countryData[`iso-3166`]} ${countryData.country_name}`);
    })
}

const Home = () => {
    const data = parseData(SG2022_data.response.holidays).filter((ele) => ele !== undefined);
    const countriesData = parseCountryData(countries.response.countries)
    console.log(countriesData);

    return (
        <div>
            <h1>Home</h1>
            <CountryForm countriesData={countriesData}/>
            <DataContext.Provider value={data}>
                <Calender />
            </DataContext.Provider>
        </div>
    )
}


export default Home

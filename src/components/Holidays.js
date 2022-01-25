import React, { useState } from 'react';

const parseHolidayData = (holidayData, color) => {
    return holidayData.map((data) => {
        if (data.type[0] === "National holiday") {
            return {
                countryId: data.country.id,
                name: data.name,
                description: data.description,
                $D: data.date.datetime.day,
                $M: data.date.datetime.month - 1,
                $y: data.date.datetime.year,
                color: color
            };
        } else return undefined;
    });
};
const getHolidays = (selectedList) => {
    return selectedList.map(({ country, color }) => {
        let holidayData = require(`../testdata/holidays-${country.slice(0, 2)}-2022.json`)
        return parseHolidayData(holidayData.response.holidays, color).filter(
            (ele) => ele !== undefined
        );
    })
}

const getHolidaysWithAPI = (selectedList, API_KEY) => {

    const makeApiCall = async (color, API_URL) => {
        const res = await fetch(API_URL);
        const data = await res.json();
        console.log(data.response.holidays);
        return (parseHolidayData(data.response.holidays, color).filter((ele) => ele !== undefined))
    };

    return selectedList.map(({ country, color }) => {
        const CODE = country.slice(0, 2);
        const API_URL = `https://calendarific.com/api/v2/holidays?&api_key=${API_KEY}&country=${CODE}&year=2022`;
        return makeApiCall(color, API_URL);
    })
}

const Holidays = async (selectedList, holidayData, setHolidayData) => {
    // console.log(process.env.REACT_APP_CALENDERIFIC_API_KEY);
    // const API_KEY = process.env.REACT_APP_CALENDERIFIC_API_KEY;
    const API_KEY = "39fdf51616e691ccf1d03f945fad15cd96e904b6";
    //'https://calendarific.com/api/v2/holidays?&api_key=API_KEY&country=CODE&year=2022'

    await setHolidayData(getHolidaysWithAPI(selectedList, API_KEY));

    return <></>;
};

export default Holidays;

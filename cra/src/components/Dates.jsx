import React from 'react'
import DayDiv from './DayDiv'

const generateDateDivs = (current, today) => {
    return ([...backFill(current), ...forwardFill(current, today)])
}

const backFill = (current) => {
    const returnArr = [];
    do {
        current = current.subtract(1, 'day');
        returnArr.unshift({current:current, prefix:"other"});
    } while (current.$W !== 0) //do last add on sunday

    // console.log(returnArr);
    return returnArr;
}

const forwardFill = (current, today) => {
    const returnArr = [];
    do {
        isToday(current,today) ? returnArr.push({current:current, prefix:"today"}) : returnArr.push({current:current, prefix:""});
        current = current.add(1, 'day');
    } while (current.$D !== 1) //stop at 1st of next month

    do {
        returnArr.push({current:current, prefix:"other"});
        current = current.add(1, 'day');
    } while (current.$W !== 0) //do last add on saturday

    // console.log(returnArr);
    return returnArr;
}

const isToday = (current, today) =>  current.$D === today.$D && current.$M === today.$M && current.$y === today.$y ? true : false


const Dates = ({ current, today }) => {
    // console.log(current)

    return (
        <DayDiv dayArr={generateDateDivs(current, today)} isToday={isToday}/>
    )
}

export default Dates

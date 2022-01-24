import React, { createContext, useState, useEffect } from "react";
import Calender from "./Calender";
import CountryForm from "./CountryForm";


// console.log(SG2022_data.response.holidays);
export const HolidayDataContext = createContext();

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

const parseCountryData = (data) => {
	return data.map((countryData, index) => {
		return `${countryData[`iso-3166`]} ${countryData.country_name}`;
	});
};

const Home = () => {
	const countries = require("../testdata/countries.json");

	const [selectedList, setSelectedList] = useState([]); //{country:"",color:""}
	const [holidayData, setHolidayData] = useState([]);

	const countriesData = parseCountryData(countries.response.countries);
	// console.log(countriesData);

	useEffect(() => {
		setHolidayData(getHolidays(selectedList));
	}, [selectedList])

	return (
		<div>
			<div className="mx-auto grid grid-rows-5 pb-10">
				<CountryForm countriesData={countriesData} selectedList={selectedList} setSelectedList={setSelectedList} />
				<HolidayDataContext.Provider value={holidayData}>
					<Calender />
				</HolidayDataContext.Provider>
			</div>
		</div>
	);
};

export default Home;

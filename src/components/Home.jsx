import React, { createContext, useState, useEffect } from "react";
import Calender from "./Calender";
import CountryForm from "./CountryForm";
import ExtraPage from "./ExtraPage";

// console.log(SG2022_data.response.holidays);
export const HolidayDataContext = createContext();

const parseHolidayData = (holidayData, color) => {
	return holidayData.map((data) => {
		if (data.type[0] === "National holiday" || (data.type[0] === "Local holiday" && (data.locations === "All"))) {
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

const parseCountryData = (data) => {
	return data.map((countryData, index) => {
		return `${countryData[`iso-3166`]} ${countryData.country_name}`;
	});
};

const Home = () => {
	// console.log(process.env.REACT_APP_CALENDERIFIC_API_KEY);
	const API_KEY = process.env.REACT_APP_CALENDERIFIC_API_KEY;
	// const API_KEY = "";
	//'https://calendarific.com/api/v2/holidays?&api_key=API_KEY&country=CODE&year=2022'



	const countries = require("../testdata/countries.json");
	const [countryList, setCountryList] = useState(parseCountryData(countries.response.countries).filter((ele) => ele !== "SG Singapore"));

	// !SelectedList {country:"",color:"",originalIndex:""}
	const [selectedList, setSelectedList] = useState([{ country: "SG Singapore", color: "blue", originalIndex: 150 }]); 
	
	const [holidayData, setHolidayData] = useState([]);

	useEffect(() => {
		// const list = [];
		// for (const ele of selectedList) {
		// 	let found = false;
		// 	for (const holidate of holidayData) {
		// 		if (holidate?.countryId === ele.country.slice(0, 2)) {
		// 			found = true;
		// 			break;
		// 		}
		// 	}
		// 	!found ? list.push(ele) : null;
		// }

		setHolidayData(getHolidaysWithAPI(selectedList, API_KEY));
	}, [selectedList])

	return (
		<div>
			<div className="home-container pb-10">
				<HolidayDataContext.Provider value={holidayData}>
					<Calender />
				</HolidayDataContext.Provider>
				<CountryForm countryList={countryList} setCountryList={setCountryList} selectedList={selectedList} setSelectedList={setSelectedList} />
				<ExtraPage />
			</div>
		</div>
	);
};

export default Home;

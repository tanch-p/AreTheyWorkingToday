import React, { useEffect, useState } from "react";

const CountryForm = ({ countriesData, selectedList, setSelectedList }) => {
	const [countryList, setCountryList] = useState([]);
	const [input, setInput] = useState("");
	const [disableAdd, setDisableAdd] = useState(false);
	const [colors, setColors] = useState(["blue", "orange", "yellow", "green", "red", "indigo", "violet"]);
	const [selectedListItem, setSelectedListItem] = useState([]);
	const [hover, setHover] = useState(false);

	const selectColor = () => {
		let selectedColor = colors[Math.floor(Math.random() * colors.length)];
		setColors(colors => colors.filter((color) => color !== selectedColor));
		return selectedColor;
	}

	const handleAdd = () => {
		let country = countryList.find((country) => country === input);
		if (country !== undefined) {
			setSelectedList([...selectedList, { country: country, color: selectColor() }]);
			setCountryList(countryList.filter((ele) => ele !== country));
			setInput("");
		}
		console.log(country);
	};

	const handleInput = (event) => {
		setInput(event.target.value);
	};

	const handleRemove = (event) => {
		console.log(event.target.dataset.id);
		setSelectedList(selectedList.filter(({ country, color }) => {
			if (country === event.target.dataset.id) {
				setColors(colors => [...colors, color]);
			}
			return country !== event.target.dataset.id
		}));
		setCountryList([...countryList, event.target.dataset.id]);
	
};

const handleListClick = (event, index) => {

	if (event.target.innerText !== "") {
		setSelectedListItem(selectedListItem.map((ele, i) => {
			return index === i
		}))
	}

};

const handleHover = (str) => {
	str === "in" ? setHover(true) : setHover(false);
}

const countryOptions = countryList.map((country) => {
	return <option value={country} key={country} />;
});

const selectedCountries = selectedList.map(({ country, color }, index) => (
	<>
		<div className="grid grid-cols-10 ml-1" onMouseOver={() => handleHover("in")} onMouseOut={() => handleHover("out")} key={country} >
			<li onClick={(event) => handleListClick(event, index)} className={`${selectedListItem[index] ? "bg-blue-100" : ""} overflow-x-auto col-span-5 no-scrollbar my-0.5 `} >{country}</li>
			<span className={`inline-block w-5 h-5 p-0 m-0 mt-1 ${color} col-span-1`} data-id="index" ></span>
			<span className="col-span-1"></span>
			<button className={`col-span-3 w-auto h-11/12 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold text-sm text-center pl-1 rounded ${hover ? "opacity-100" : "opacity-0"}`} onClick={handleRemove} data-id={country}>Remove</button>
		</div>
	</>
));

const initialise = () => {
	setSelectedList([...selectedList, { country: "SG Singapore", color: "blue" }, { country: "JP Japan", color: "red" }, { country: "CN China", color: "orange" }]);
	setCountryList(countryList => countryList.filter((ele) => ele !== "SG Singapore" || ele !== "JP Japan" || ele !== "CN China"));
}

//initialise countrylist array on mount
useEffect(() => {
	setCountryList(countryList => countriesData.filter((ele) => ele !== "SG Singapore"));
	// initialise();
}, []);

useEffect(() => {
	selectedList.length >= 7 ? setDisableAdd(true) : setDisableAdd(false)
	setSelectedListItem(selectedList.map((ele, index) => false));
}, [selectedList]);

return (
	<>
		<div className="form-container grid grid-rows-6 col-span-1 mx-0 my-10 border-4 border-gray-600 align-content-left w-fit bg-gray-100">

			<div className="row-span-1 ml-1">
				<label form="country-choice">Search or select a country: </label>
				<input
					className="	border-gray-600	border-2 pl-1"
					list="country-list"
					id="country-choice"
					name="country-choice"
					autoComplete="off"
					onChange={handleInput}
					value={input}
				/>
				<datalist id="country-list">{countryOptions}</datalist>
				<button name="Add" disabled={disableAdd} onClick={handleAdd} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 ml-3 rounded" >
					Add
				</button>
			</div>
			<div className="row-span-5 border-t-4 border-b-4 border-gray-500 pl-1">
				<label form="country-selected" className="border-b-2 border-black">Countries selected:</label>
				<ul>{selectedCountries}</ul>
			</div>
			<h2>・Maximum of 8 countries</h2>
			{/* <button name="Remove" disabled={disableRemove} onClick={handleRemove} className="border-4 border-gray-400" >
					Remove
				</button> */}
		</div>
	</>
);
};

export default CountryForm;

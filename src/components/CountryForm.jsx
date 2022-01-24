import React, { useEffect, useState } from "react";

const CountryForm = ({ countriesData, selectedList, setSelectedList }) => {
	const [countryList, setCountryList] = useState([]);
	const [input, setInput] = useState("");
	const [listItem, setListItem] = useState("");
	const [disableAdd, setDisableAdd] = useState(false);
	const [disableRemove, setDisableRemove] = useState(false);
	const [colors, setColors] = useState(["blue","orange","yellow","green","red","indigo","violet"]);

	const selectColor = () => {
		let selectedColor = colors[Math.floor(Math.random()*colors.length)];
		setColors(colors => colors.filter((color) => color!=selectedColor));
		return selectedColor;
	}

	const handleAdd = () => {
		let country = countryList.find((country) => country === input);
		if (country !== undefined) {
			setSelectedList([...selectedList, {country:country,color:selectColor()}]);
			setCountryList(countryList.filter((ele) => ele !== country));
			setInput("");
		}
		console.log(country);
	};

	const handleInput = (event) => {
		setInput(event.target.value);
	};

	const handleRemove = () => {
		if (listItem === "") {
			console.log("is empty");
		} else {
			setSelectedList(selectedList.filter(({country,color}) => {
				if(country === listItem){
					setColors(colors => [...colors,color]);
				}
				return country !== listItem
			}));
			setCountryList([...countryList, listItem]);
			setListItem("");
		}
	};

	const handleListClick = (event) => {
		console.log(event.target.innerText);
		setListItem(event.target.innerText);
	};

	const countryOptions = countryList.map((country) => {
		return <option value={country} key={country} />;
	});

	const selectedCountries = selectedList.map(({country, color}) => (
		<li onClick={handleListClick} key={country}>
			{country} <span className={`day day-events ${color}`}></span>
		</li>
	));

	const initialise = () => {
		setSelectedList([...selectedList, {country:"SG Singapore",color:"blue"},{country:"JP Japan",color:"red"},{country:"CN China", color:"orange"}]);
		setCountryList(countryList => countryList.filter((ele) => ele !== "SG Singapore" || ele !== "JP Japan" || ele !== "CN China"));
	}

	//initialise countrylist array on mount
	useEffect(() => {
		setCountryList(countryList => countriesData);
		initialise();
	}, []);

	useEffect(() => {
		selectedList.length === 0 ? setDisableRemove(true) : setDisableRemove(false)
		selectedList.length >= 7 ? setDisableAdd(true) : setDisableAdd(false)
	}, [selectedList]);

	return (
		<>
			<div className="form-container grid grid-cols-7 row-span-2 mx-auto border-4 border-gray-400">
				<div className="col-span-3">
					<label form="country-choice">Choose a country:</label>
					<input
						className="	border-gray-900	border-2"
						list="country-list"
						id="country-choice"
						name="country-choice"
						autoComplete="off"
						onChange={handleInput}
						value={input}
					/>

					<datalist id="country-list">{countryOptions}</datalist>
				</div>
				<div className="grid grid-rows-2 col-span-1">
					<button name="Add" disabled={disableAdd} onClick={handleAdd}>
						Add
					</button>
					<button name="Remove" disabled={disableRemove} onClick={handleRemove}>
						Remove
					</button>
				</div>
				<div className="col-span-3">
					<label form="country-selected">Countries selected:</label>
					<ul>{selectedCountries}</ul>
				</div>
			</div>
		</>
	);
};

export default CountryForm;

import React, { useEffect, useState } from 'react';

const CountryForm = ({ countriesData }) => {
  const [countryList, setCountryList] = useState([]);
  const [input, setInput] = useState("");
  const [selectedList, setSelectedList] = useState([]);
  const [listItem, setListItem] = useState("");

  //initialise countrylist array on mount
  useEffect(() => setCountryList(countriesData), [])

  const handleAdd = (event) => {
    let country = countryList.find((country) => country === input);
    if (country !== undefined) {
      setSelectedList([...selectedList, country]);
      setCountryList(countryList.filter((ele) => ele !== country));
      setInput("");
    }
    console.log(country);
  }

  const handleInput = (event) => {
    setInput(event.target.value);
  }

  const handleRemove = () => {
    if (listItem === "") {
      console.log("is empty");
    } else {
      setSelectedList(selectedList.filter((ele) => ele !== listItem));
      setCountryList([...countryList, listItem]);
      setListItem("");
    }
  }

  const handleListClick = (event) => {
    console.log(event.target.innerText);
    setListItem(event.target.innerText);
  }

  const countryOptions = countryList.map((country, index) => {
    return <option value={country} key={country} />
  })

  const selectedCountries = selectedList.map((country, index) => <li onClick={handleListClick} key={country}>{country} <span className='day day-events blue'></span></li>)

  return (
    <>
      <div>

        <label form="country-choice">Choose a country:</label>
        <input list="country-list" id="country-choice" name="country-choice" autoComplete="off" onChange={handleInput} value={input} />

        <datalist id="country-list">
          {countryOptions}
        </datalist>

        <button name=">" disabled={false} onClick={handleAdd}>Add</button>
        <button name="<" disabled={false} onClick={handleRemove}>Remove</button>
        <div>
          <label form="country-selected">Countries selected:</label>
          <ul>
            {selectedCountries}
          </ul>
        </div>
      </div>
    </>

  )
};

export default CountryForm;

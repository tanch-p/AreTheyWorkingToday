import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";

// import API_KEY from ".env"

function App() {
	const [Holidays, setHolidays] = useState(null);

	let x = require("./testdata/holidays-sg-2022.json");

	// useEffect(() => {

	//   const makeApiCall = async () => {
	//     const res = await fetch(url);
	//     const json = await res.json();
	//     console.log(json.holidays[0].name);
	//   };

	//   makeApiCall();
	// }, []);

	return (
		<div className="App">
			<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
				<div className="flex items-center flex-shrink-0 text-white mr-6">
					<span className="font-semibold text-xl tracking-tight">
						Are They Working Today?
					</span>
				</div>
				<div className="w-full block flex-grow lg:flex md:flex lg:items-center md:items-center md:w-auto lg:w-auto">
					<div className="text-sm lg:flex-grow">
						<Link
							to="/"
							className="block mt-4 md:inline-block lg:inline-block md:mt-0  lg:mt-0 text-teal-200 hover:text-white mr-4"
						>
							Calender
						</Link>
						<Link
							to="/about"
							className="block mt-4 md:inline-block lg:inline-block md:mt-0 lg:mt-0 text-teal-200 hover:text-white mr-4"
						>
							About
						</Link>
					</div>
				</div>
			</nav>
			<main>
				<Routes>
					<Route path="/" element={<Home />} />
					<Route path="/about" element={<About />} />
					<Route path="*" element={<NotFound />} />
				</Routes>
			</main>
			<footer className="text-center bg-gray-900 text-white">
				<div className="container pt-6 pb-1">
					<div className="flex justify-center mb-6">

						<a href="https://github.com/tanch-p/AreTheyWorkingToday" type="button" className="rounded-full border-2 border-white text-white leading-normal uppercase hover:bg-black hover:bg-opacity-5 focus:outline-none focus:ring-0 transition duration-150 ease-in-out w-9 h-9 m-1">
							<svg aria-hidden="true"
								focusable="false"
								data-prefix="fab"
								data-icon="github"
								className="w-3 h-full mx-auto"
								role="img"
								xmlns="http://www.w3.org/2000/svg"
								viewBox="0 0 496 512"
							>
								<path
									fill="currentColor"
									d="M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"
								></path>
							</svg>
						</a>
					</div>
				</div>
			</footer>

		</div>
	);
}

export default App;

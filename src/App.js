import "./App.css";
import { useState, useEffect } from "react";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import NotFound from "./components/NotFound";
import { Footer } from "./components/Footer";

function App() {

	return (
		<div className="App">
			<nav className="flex items-center justify-between flex-wrap bg-teal-500 p-6">
				<div className="flex items-center flex-shrink-0 text-white mr-6">
					<span className="font-semibold text-xl tracking-tight">
						Are They Working Today?
					</span>
				</div>
				<div className="w-full block flex-grow lg:flex md:flex lg:items-center md:items-center md:w-auto lg:w-auto">
					<div className="text-base lg:flex-grow">
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
			<Footer />

		</div>
	);
}

export default App;

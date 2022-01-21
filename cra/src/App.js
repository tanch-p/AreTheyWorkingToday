import './App.css';
import { useState, useEffect } from "react"
import {Link, Route, Routes, useNavigate} from "react-router-dom"
import Home from './components/Home';
import About from './components/About';
import NotFound from './components/NotFound';


// import API_KEY from ".env"

function App() {
  const [Holidays, setHolidays] = useState(null)

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
      <nav>
        <Link to="/"><h1>Home</h1></Link>
        <Link to="/about">About</Link>
      </nav>
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;

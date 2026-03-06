import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import logo from "../public/assets/images/logo.svg";
import SearchInput from "./components/SearchInput";
import Dashboard from "./components/Dashboard";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [countryData, setCountryData] = useState({
    state: "",
    country: ""
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`,
      );
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setCurrentWeather(data.current);
        }
        console.log(currentWeather);
        console.log(data);
      }
    };

    if (lat != null) {
      fetchWeatherData();
    }
  }, [lat, long]);

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
          <h4 style={{}}>Weather Now</h4>
        </div>
      </header>
      <SearchInput
        setLat={setLat}
        setLong={setLong}
        countryData={countryData}
        setCountryData={setCountryData}
      />
      <Dashboard
        time={currentWeather?.time}
        temp={currentWeather?.temperature_2m}
        countryData={countryData}
      />
    </>
  );
}

export default App;

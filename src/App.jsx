import { useEffect, useState } from "react";
import "./App.css";
import logo from "../public/assets/images/logo.svg";
import SearchInput from "./components/SearchInput";
import Dashboard from "./components/Dashboard";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentUnits, setCurrentUnits] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
  const [countryData, setCountryData] = useState({
    state: "",
    country: "",
  });

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,wind_speed_10m,relative_humidity_2m,precipitation&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`,
      );
      setIsLoading(true)
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setCurrentWeather(data.current);
          setCurrentUnits(data.current_units);
        }
        setIsLoading(false)
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
        </div>
      </header>
      <SearchInput
        setLat={setLat}
        setLong={setLong}
        countryData={countryData}
        setCountryData={setCountryData}
      />
      <Dashboard
        currentWeather={currentWeather}
        countryData={countryData}
        currentUnits={currentUnits}
        isLoading={isLoading}
      />
    </>
  );
}

export default App;

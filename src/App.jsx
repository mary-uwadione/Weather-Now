import { useEffect, useState, useCallback } from "react";
import "./App.css";
import logo from "./assets/images/logo.svg";
import SearchInput from "./components/SearchInput";
import Dashboard from "./components/Dashboard";

function App() {
  const [lat, setLat] = useState(null);
  const [long, setLong] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [currentUnits, setCurrentUnits] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [countryData, setCountryData] = useState({ state: "", country: "" });

  // Load recent searches from localStorage
  const [recentSearches, setRecentSearches] = useState(() => {
    try { return JSON.parse(localStorage.getItem("recent_searches") || "[]"); }
    catch { return []; }
  });

  // useCallback so fetchWeatherData can be reused for auto-refresh
  const fetchWeatherData = useCallback(async () => {
    if (lat == null) return;
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${long}&current=temperature_2m,apparent_temperature,wind_speed_10m,relative_humidity_2m,precipitation,weather_code&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m`
      );
      if (!response.ok) throw new Error("Failed to fetch weather data.");
      const data = await response.json();
      if (data) {
        setCurrentWeather(data.current);
        setCurrentUnits(data.current_units);
      }
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, [lat, long]);

  // Fetch when lat/long changes
  useEffect(() => {
    if (lat != null) fetchWeatherData();
  }, [lat, long, fetchWeatherData]);

  // Auto-refresh every 5 minutes
  useEffect(() => {
    if (lat == null) return;
    const interval = setInterval(() => {
      fetchWeatherData();
    }, 5 * 60 * 1000);
    return () => clearInterval(interval); // cleanup on unmount
  }, [lat, fetchWeatherData]);

  // Save city to recent searches
  const saveRecentSearch = (cityName) => {
    setRecentSearches((prev) => {
      const updated = [
        cityName,
        ...prev.filter((c) => c.toLowerCase() !== cityName.toLowerCase()),
      ].slice(0, 5);
      localStorage.setItem("recent_searches", JSON.stringify(updated));
      return updated;
    });
  };

  // Geolocation on load
  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const { latitude, longitude } = pos.coords;
        // Reverse geocode to get city name
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
          );
          const data = await res.json();
          const city =
            data.address?.city ||
            data.address?.town ||
            data.address?.village ||
            "Your Location";
          setCountryData({
            state: city,
            country: data.address?.country_code?.toUpperCase() || "",
          });
          saveRecentSearch(city);
        } catch {
          setCountryData({ state: "Your Location", country: "" });
        }
        setLat(latitude);
        setLong(longitude);
      },
      () => {} // silently ignore if user denies
    );
  }, []);

  return (
    <>
      <header>
        <div className="logo">
          <img src={logo} alt="logo" />
          <span>Weather Now</span>
        </div>
      </header>

      <SearchInput
        setLat={setLat}
        setLong={setLong}
        countryData={countryData}
        setCountryData={setCountryData}
        recentSearches={recentSearches}
        saveRecentSearch={saveRecentSearch}
      />

      {/* Error message shown on screen instead of alert() */}
      {error && (
        <div className="error-box">
          <span>⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <Dashboard
        currentWeather={currentWeather}
        countryData={countryData}
        currentUnits={currentUnits}
        isLoading={isLoading}
        onRefresh={fetchWeatherData}
      />
    </>
  );
}

export default App;
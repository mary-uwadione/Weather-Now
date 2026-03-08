import { useState } from "react";

const SearchInput = ({
  setLat,
  setLong,
  countryData,
  setCountryData,
  recentSearches,
  saveRecentSearch,
}) => {
  const appId = import.meta.env.VITE_PUBLIC_OPEN_API_KEY;
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const searchCity = async (cityName) => {
    if (!cityName.trim()) {
      setError("Please enter a city name.");
      return;
    }
    if (!appId) {
      setError("API key is missing. Check your .env file.");
      return;
    }
    setIsLoading(true);
    setError("");
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${appId}`
      );
      if (!response.ok) {
        setError(`API error: ${response.status}. Check your API key.`);
        return;
      }
      const data = await response.json();
      if (data && data.length !== 0) {
        setLat(data[0]?.lat);
        setLong(data[0]?.lon);
        setCountryData({
          ...countryData,
          state: data[0]?.name,
          country: data[0]?.country,
        });
        saveRecentSearch(data[0]?.name);
      } else {
        setError(`City "${cityName}" not found. Please check the spelling.`);
      }
    } catch {
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    searchCity(text);
  };

  return (
    <div className="cont">
      <h3>How's the sky looking today?</h3>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Search for a place..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <div className="search-error">
          ⚠️ {error}
        </div>
      )}

      {/* Recent searches */}
      {recentSearches.length > 0 && (
        <div className="recent-searches">
          <span className="recent-label">Recent:</span>
          {recentSearches.map((city) => (
            <button
              key={city}
              className="recent-chip"
              onClick={() => searchCity(city)}
            >
              {city}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchInput;
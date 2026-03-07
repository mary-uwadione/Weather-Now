import { useState } from "react";
import searchIcon from "../../public/assets/images/icon-search.svg";

const SearchInput = ({ setLat, setLong, countryData, setCountryData }) => {
  const appId = import.meta.env.VITE_PUBLIC_OPEN_API_KEY;
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  console.log(isLoading);
  const searchCountry = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${text}&appid=${appId}`,
      );
      if (response.ok) {
        setIsLoading(false);
        const data = await response.json();
        if (data) {
          if (data.length != 0) {
            setLat(data[0]?.lat);
            setLong(data[0]?.lon);
            setCountryData({
              ...countryData,
              state: data[0]?.name,
              country: data[0]?.country,
            });
          } else {
            alert("This place does not exist!");
          }
        }
      }
    } catch (e) {
      setIsLoading(false);
      alert("There's probably a network issue!");
    }
  };
  return (
    <div className="cont">
      <h3>How's the sky looking today ?</h3>
      <form onSubmit={searchCountry}>
        <input
          type="text"
          placeholder="Search for a place.."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Loading..." : "Search"}
        </button>
      </form>
    </div>
  );
};

export default SearchInput;

import WeatherCard from "./WeatherCard";
import {
  WiDaySunny,
  WiDayCloudy,
  WiCloudy,
  WiFog,
  WiSprinkle,
  WiRain,
  WiSnow,
  WiShowers,
  WiThunderstorm,
  WiCloud,
} from "react-icons/wi";

// Returns an icon component based on weather code
const getWeatherInfo = (code) => {
  if (code === 0)  return { label: "Clear Sky",     Icon: WiDaySunny };
  if (code <= 2)   return { label: "Partly Cloudy", Icon: WiDayCloudy };
  if (code === 3)  return { label: "Overcast",      Icon: WiCloudy };
  if (code <= 49)  return { label: "Foggy",         Icon: WiFog };
  if (code <= 59)  return { label: "Drizzle",       Icon: WiSprinkle };
  if (code <= 69)  return { label: "Rain",          Icon: WiRain };
  if (code <= 79)  return { label: "Snow",          Icon: WiSnow };
  if (code <= 84)  return { label: "Rain Showers",  Icon: WiShowers };
  if (code <= 94)  return { label: "Thunderstorm",  Icon: WiThunderstorm };
  return           { label: "Unknown",              Icon: WiCloud };
};

const Dashboard = ({
  currentWeather,
  countryData,
  currentUnits,
  isLoading,
  onRefresh,
}) => {
  const date =
    currentWeather?.time != undefined
      ? new Date(currentWeather?.time).toDateString()
      : "";

  const weatherInfo = getWeatherInfo(currentWeather?.weather_code);
  const { Icon } = weatherInfo;

  return (
    <div className="card-cont">
      <div className="card">

        {/* Left: city, date, condition */}
        <div className="country-details">
          {countryData?.state && (
            <h3>
              {countryData.state}
              {countryData.country ? `, ${countryData.country}` : ""}
            </h3>
          )}
          <p className="date">{date}</p>
          {currentWeather && !isLoading && (
            <p className="condition-label">
              <Icon size={20} style={{ verticalAlign: "middle", marginRight: 4 }} />
              {weatherInfo.label}
            </p>
          )}
        </div>

        {/* Right: big icon + temperature */}
        <div className="temp-block">
          {isLoading ? (
            <div className="spinner">↻</div>
          ) : (
            <>
              {currentWeather && (
                <Icon size={72} className="weather-icon-main" />
              )}
              <h4>
                {currentWeather?.temperature_2m != undefined
                  ? `${currentWeather.temperature_2m}${currentUnits?.temperature_2m}`
                  : "—"}
              </h4>
            </>
          )}
        </div>

      </div>

      {/* Refresh button */}
      {currentWeather && (
        <div className="refresh-row">
          <button
            className="refresh-btn"
            onClick={onRefresh}
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Refresh"}
          </button>
          <span className="auto-update-note">Auto-updates every 5 minutes</span>
        </div>
      )}

      {/* Stat cards */}
      <div className="row">
        <WeatherCard
          isLoading={isLoading}
          property="Feels Like"
          value={
            currentWeather?.apparent_temperature != undefined
              ? `${currentWeather.apparent_temperature}${currentUnits?.apparent_temperature}`
              : ""
          }
        />
        <WeatherCard
          isLoading={isLoading}
          property="Wind Speed"
          value={
            currentWeather?.wind_speed_10m != undefined
              ? `${currentWeather.wind_speed_10m} ${currentUnits?.wind_speed_10m}`
              : ""
          }
        />
        <WeatherCard
          isLoading={isLoading}
          property="Humidity"
          value={
            currentWeather?.relative_humidity_2m != undefined
              ? `${currentWeather.relative_humidity_2m}${currentUnits?.relative_humidity_2m}`
              : ""
          }
        />
        <WeatherCard
          isLoading={isLoading}
          property="Precipitation"
          value={
            currentWeather?.precipitation != undefined
              ? `${currentWeather.precipitation}${currentUnits?.precipitation}`
              : ""
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
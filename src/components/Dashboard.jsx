import WeatherCard from "./WeatherCard";
import { useState } from "react";
import loading from "../../public/assets/images/icon-loading.svg";

const Dashboard = ({
  currentWeather,
  countryData,
  currentUnits,
  isLoading,
}) => {
  const date =
    currentWeather?.time != undefined
      ? new Date(currentWeather?.time).toDateString()
      : "";
  return (
    <div className="card-cont">
      <div className="card">
        <div className="country-details">
          <h3 style={{ marginBottom: "20px" }}>
            {countryData?.state} {countryData?.country}
          </h3>
          <p>{date}</p>
        </div>
        {/* <img src={} alt="" /> */}
        <h4>
          {currentWeather?.temperature_2m != undefined
            ? `${currentWeather?.temperature_2m}${currentUnits?.temperature_2m}`
            : ""}
        </h4>
      </div>

      <div className="row">
        <WeatherCard
          property={"Feels like"}
          value={
            currentWeather?.temperature_2m != undefined
              ? `${currentWeather?.temperature_2m}${currentUnits?.temperature_2m}`
              : ""
          }
        />
        <WeatherCard
          property={"Wind Speed"}
          value={
            currentWeather?.wind_speed_10m != undefined
              ? `${currentWeather?.wind_speed_10m}${
                  currentUnits?.wind_speed_10m
                }`
              : ""
          }
        />
        <WeatherCard
          property={"Humidity"}
          value={
            currentWeather?.relative_humidity_2m != undefined
              ? `${currentWeather?.relative_humidity_2m}${
                  currentUnits?.relative_humidity_2m
                }`
              : ""
          }
        />
        <WeatherCard
          property={"Precipitation"}
          value={
            currentWeather?.precipitation != undefined
              ? `${currentWeather?.precipitation}${currentUnits?.precipitation}`
              : ""
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;

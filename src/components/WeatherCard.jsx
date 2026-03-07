import loading from "../../public/assets/images/icon-loading.svg";

const WeatherCard = ({ property, value, isLoading }) => {
  return (
    <div className="property-card">
      {isLoading ? (
        <img src={loading} alt="" className="loading" />
      ) : (
        <>
          <p className="property">{property}</p>
          <p className="value">{value}</p>
        </>
      )}
    </div>
  );
};

export default WeatherCard;

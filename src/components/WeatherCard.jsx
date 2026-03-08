const WeatherCard = ({ property, value, isLoading, icon }) => {
  return (
    <div className="property-card">
      {isLoading ? (
        <div className="card-loading">
          <div className="shimmer" />
          <div className="shimmer shimmer-short" />
        </div>
      ) : (
        <>
          <p className="property">
            {icon && <span className="card-icon">{icon}</span>}
            {property}
          </p>
          <p className="value">{value || "—"}</p>
        </>
      )}
    </div>
  );
};

export default WeatherCard;
const Dashboard = ({time, temp, countryData}) => {
  return (
    <div className="card-cont">
      <div className="card">
        <h3>
          {countryData?.state} {countryData?.country}
        </h3>
        <p>{time}</p>

        <h4>{temp}</h4>
      </div>
    </div>
  );
};

export default Dashboard;

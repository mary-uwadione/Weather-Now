
const WeatherCard = ({property, value}) => {
    return (
        <div className="property-card">
        <p className="property">{property}</p>
        <p className="value">{value}</p>
        </div>
    )
}

export default WeatherCard
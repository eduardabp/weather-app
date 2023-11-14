
/* TODO: Get geoposition from geo api */

const getGeoData = async (city) => {
    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=10&language=en&format=json");
    const data = await response.json();
    console.log(data.results[0])
    return data.results[0];

}

/* TODO: Get information from weather api */

const getWeatherData = async (location) => {
    const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=" + location.latitude + "&longitude=" + location.longitude + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,precipitation,rain,showers,snowfall,weather_code,cloud_cover,wind_speed_10m&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,rain_sum,showers_sum,snowfall_sum,precipitation_probability_max,wind_speed_10m_max&forecast_days=3");
    const data = await response.json();
    console.log(data)
    return data;
}

/* TODO: Await for both data */

const getAllData = async () => {

}

/* TODO: Display the information on DOM */

const displayWeatherData = async () => {

}

/* TODO: Add event listeners */

const formInput = document.getElementById("form")
formInput.addEventListener("submit", (e) => {
	e.preventDefault();
	displayWeatherData();
})
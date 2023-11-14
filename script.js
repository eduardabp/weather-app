
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
    const locationInput = document.getElementById("location-input");
    const location = locationInput.value;
    console.log(location)

    const coordinates = await getGeoData(location);
    const weatherData = await getWeatherData(coordinates);
    const values = [location, weatherData];
    return values;
}

/* TODO: Display the information on DOM */

const displayWeatherData = async () => {
    const info = await getAllData();
    const location = info[0];
    const weatherInfo = info[1];
    const daily = document.querySelector(".daily");
    console.log(location);

    const d = new Date();
    const dailyHeading = document.createElement("h2");
    dailyHeading.innerHTML = d.toDateString();
    dailyHeading.classList.add("date");
    daily.appendChild(dailyHeading);

    const city = document.createElement("p");
    city.innerHTML = location;
    city.classList.add("city");
    daily.appendChild(city);

    /* current */
 
    const temperature = document.createElement("p");
    temperature.innerHTML = weatherInfo.current.temperature_2m + weatherInfo.current_units.temperature_2m;
    temperature.classList.add("temperature");
    daily.appendChild(temperature);

    const sensation = document.createElement("p");
    sensation.innerHTML = "feels like " + weatherInfo.current.apparent_temperature + weatherInfo.current_units.temperature_2m;
    sensation.classList.add("feels-like");
    daily.appendChild(sensation);

    const weatherType = document.createElement("p");
    const weatherTypeText = () => {
        let weatherCode = weatherInfo.current.weather_code;
        if (weatherCode === 0) {
            return "Clear";
        }
        else if (weatherCode > 0 && weatherCode < 50) {
            return "Cloudy";
        }
        else if (weatherCode > 50 && weatherCode < 68 || weatherCode > 79 && weatherCode < 83) {
            return "Rainy"
        }
        else if (weatherCode > 70 && weatherCode < 80 || weatherCode > 84 && weatherCode < 87) {
            return "Snowy"
        }
        else if (weatherCode > 94) {
            return "Stormy"
        }
    }
    weatherType.innerHTML = weatherTypeText();
    weatherType.classList.add("weather-type");
    daily.appendChild(weatherType);

    const umidity = document.createElement("p");
    const umidityIcon = document.createElement("img");
    umidityIcon.src = "images/humidity.png"
    umidityIcon.classList.add("icon");
    const umidityText = document.createTextNode(weatherInfo.current.relative_humidity_2m + "%");
    umidity.appendChild(umidityIcon);
    umidity.appendChild(umidityText);
    umidity.classList.add("umidity");
    daily.appendChild(umidity);

    const wind = document.createElement("p");
    const windIcon = document.createElement("img");
    windIcon.src = "images/wind.png"
    windIcon.classList.add("icon");
    const windText = document.createTextNode(weatherInfo.current.wind_speed_10m + " Km/h");
    wind.appendChild(windIcon);
    wind.appendChild(windText);
    wind.classList.add("wind");
    daily.appendChild(wind);

    /* week */
}

/* TODO: Add event listeners */

const formInput = document.getElementById("form")
formInput.addEventListener("submit", (e) => {
	e.preventDefault();
	displayWeatherData();
})
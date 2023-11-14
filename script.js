
/* TODO: Get geoposition from geo api */

const getGeoData = async (city) => {
    const response = await fetch("https://geocoding-api.open-meteo.com/v1/search?name=" + city + "&count=10&language=en&format=json");
    const data = await response.json();
    console.log(data.results[0])
    return data.results[0];

}

/* TODO: Get information from weather api */

const getWeatherData = async (location) => {
    const response = await fetch ("https://api.open-meteo.com/v1/forecast?latitude=" + location.latitude + "&longitude=" + location.longitude + "&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min");
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
    const values = [coordinates, weatherData];
    return values;
}

/* TODO: Display the information on DOM */

const displayWeatherData = async () => {
    const info = await getAllData();
    const geo = info[0];
    const weatherInfo = info[1];
    const daily = document.querySelector(".daily");
    console.log(geo);

    const d = new Date();
    const dailyHeading = document.createElement("h2");
    dailyHeading.innerHTML = d.toDateString();
    dailyHeading.classList.add("date");
    daily.appendChild(dailyHeading);

    const city = document.createElement("p");
    city.innerHTML = geo.name + ", " + geo.country;
    city.classList.add("city");
    daily.appendChild(city);

    /* current */
 
    const temperature = document.createElement("p");
    temperature.innerHTML = weatherInfo.current.temperature_2m + weatherInfo.current_units.temperature_2m;
    temperature.classList.add("temperature");
    daily.appendChild(temperature);

    const sensation = document.createElement("p");
    sensation.innerHTML = "feels like " + Math.round(weatherInfo.current.apparent_temperature) + weatherInfo.current_units.temperature_2m;
    sensation.classList.add("feels-like");
    daily.appendChild(sensation);

    const weatherType = document.createElement("p");
    const weatherTypeText = () => {
        let weatherCode = weatherInfo.current.weather_code;
        const main = document.querySelector("main");
        if (weatherCode >= 0 && weatherCode < 3) {
            main.style.backgroundImage = 'url("images/sunny.jpg")';
            main.style.color = "aliceblue";
            return "Clear";
        }
        else if (weatherCode > 2 && weatherCode < 56) {
            main.style.backgroundImage = 'url("images/cloudy.jpg")';
            main.style.color = "aliceblue";
            return "Cloudy";
        }
        else if (weatherCode > 55 && weatherCode < 68 || weatherCode > 79 && weatherCode < 83) {
            main.style.backgroundImage = 'url("images/rainy.jpg")';
            main.style.color = "aliceblue";
            return "Rainy"
        }
        else if (weatherCode > 70 && weatherCode < 80 || weatherCode > 84 && weatherCode < 87) {
            main.style.backgroundImage = 'url("images/snowy.jpg")';
            return "Snowy"
        }
        else if (weatherCode > 94) {
            main.style.backgroundImage = 'url("images/stormy.jpg")';
            main.style.color = "aliceblue";
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

    /* background */

    /* week */

    let i = 0;
    for (i=1; i<6; i++) {
        const weekly = document.querySelector(".weekly-row");
        const div = document.createElement("div");

        const weekDate = document.createElement("p");
        let objectDate = new Date();
        let day = objectDate.getDate();
        let month = objectDate.getMonth();
        weekDate.innerHTML = day + i + "/" + month;
        weekDate.classList.add("week-day");
        div.appendChild(weekDate);

        const image = document.createElement("img");
        const weatherTypeWeek = () => {
            let weatherCode = weatherInfo.daily.weather_code[i];
            if (weatherCode >= 0 && weatherCode < 3) {
                return "clear";
            }
            else if (weatherCode > 2 && weatherCode < 56) {
                return "cloudy";
            }
            else if (weatherCode > 55 && weatherCode < 68 || weatherCode > 79 && weatherCode < 83) {
                return "rainy"
            }
            else if (weatherCode > 70 && weatherCode < 80 || weatherCode > 84 && weatherCode < 87) {
                return "snowy"
            }
            else if (weatherCode > 94) {
                return "stormy"
            }
        }
        image.src = "images/" + weatherTypeWeek() + ".png";
        image.classList.add("week-weather-type");
        div.appendChild(image);

        const temperatureRange = document.createElement("p");
        temperatureRange.innerHTML = Math.round(weatherInfo.daily.temperature_2m_max[i]) + weatherInfo.daily_units.temperature_2m_max + " / " + Math.round(weatherInfo.daily.temperature_2m_min[i]) + weatherInfo.daily_units.temperature_2m_min;
        temperatureRange.classList.add("week-temperature");
        div.appendChild(temperatureRange);

        weekly.appendChild(div);
    }

    const forecast = document.querySelector(".forecast-div");
    forecast.style.visibility = "visible";
}

/* TODO: Add event listeners */

const formInput = document.getElementById("form")
formInput.addEventListener("submit", (e) => {
	e.preventDefault();
	displayWeatherData();
})
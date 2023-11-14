
/* TODO: Read user input to sent to geo api */

/* TODO: Get geoposition from geo api */

/* TODO: Get information from weather api */

/* TODO: Display the information on DOM */

/* TODO: Add event listeners */

const button = document.querySelector("button");
const input = document.querySelector("input");

button.addEventListener("click", displayWeatherData);
input.addEventListener("keyup", (e) => {
    if (e.code === "Enter") {
        displayWeatherData();
    }
})
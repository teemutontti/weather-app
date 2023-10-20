// Saving the dates each time the script is initialized
const todaysDate = new Date();
const tomorrowsDate = new Date(todaysDate);
const dayAftersDate = new Date(tomorrowsDate);
tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
dayAftersDate.setDate(dayAftersDate.getDate() + 2);
let temperatureUnit = "F";

//Function for returning date in a formatted matter
const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
};

//Function for fetching info from html input <-- Mikko
function getWeather() {
    let city = document.getElementById("field").value;

    fetchWeather(city);
}

function toggleTemperature(dataArr) {
    if (temperatureUnit == "C") {
        temperatureUnit = "F";
    } else {
        temperatureUnit = "C";
    }

    updateToday(dataArr.today);
    updateTomorrow(dataArr.tomorrow);
    updateDayAfter(dataArr.dayAfter);
}

//Function to call getWeather if enter is pressed in html search form.
document.getElementById("field").addEventListener("keyup", function (event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

//Function for fetching weather <-- Mikko
async function fetchWeather(city) {
    const apiKey = "e15e748acfc2424f9df135245232809";
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    let hr = await fetch(url);
    let data = await hr.json(); // Parse data to json Author: Noora
    let dataArr = parsedData(data); // Parse data to object Author: Noora

    toggleTemperature(dataArr);
}

//Function for parseing fetched data <-- Noora
function parsedData(data) {
    let today = data;
    let tomorrow = data.forecast.forecastday[1].day;
    let dayAfter = data.forecast.forecastday[2].day;

    return {
        today: today,
        tomorrow: tomorrow,
        dayAfter: dayAfter,
    };
}

//Function for returning current weather to html <-- Jenny
function updateToday(dataObject) {
    let day = checkDay(dataObject);
    let iconUrl = dataObject.current.condition.icon.replace("64x64", "128x128");

    //Change website background if its day or night
    if (day) {
        document.body.style.backgroundImage = "url(./pics/daybg.webp)";
    } else {
        document.body.style.backgroundImage = "url(./pics/nightbg.webp)";
    }

    //Change website information based on retrieved data from API

    if (temperatureUnit == "C") {
        document.querySelector(
            ".today .temperature"
        ).textContent = `${dataObject.current.temp_c}°C`;
        document.querySelector(
            ".today .max-min-temp"
        ).textContent = `${dataObject.forecast.forecastday[0].day.maxtemp_c}°C / ${dataObject.forecast.forecastday[0].day.mintemp_c}°C`;
    } else {
        document.querySelector(
            ".today .temperature"
        ).textContent = `${dataObject.current.temp_f}°F`;
        document.querySelector(
            ".today .max-min-temp"
        ).textContent = `${dataObject.forecast.forecastday[0].day.maxtemp_f}°F / ${dataObject.forecast.forecastday[0].day.mintemp_f}°F`;
    }
    document.querySelector(".today .city").textContent =
        dataObject.location.name;
    document.querySelector(".today img").src = "http:" + iconUrl;
    document.querySelector(".today .info").textContent =
        dataObject.current.condition.text;
    //Change text "Wind: " to icon when it has been selected
    document.querySelector(".today .wind").textContent = `Wind: ${calcWindSpeed(
        dataObject
    )} m/s`;
}

//Function for returning tomorrows weather to html <-- Teemu
function updateTomorrow(dataObject) {
    document.querySelector(".tomorrow .date").textContent = `${formatDate(
        tomorrowsDate
    )}`;
    document.querySelector(
        ".tomorrow img"
    ).src = `https:${dataObject.condition.icon}`;
    document.querySelector(
        ".tomorrow .max-min-temp"
    ).textContent = `${dataObject.maxtemp_c}°C / ${dataObject.mintemp_c}°C`;
    document.querySelector(
        ".tomorrow .chance-of-rain"
    ).textContent = `Chance of rain: ${dataObject.daily_chance_of_rain}%`;
}

//Function for returning day after tomorrows weather to html <-- Noora
function updateDayAfter(dataObject) {
    document.querySelector(".day-after .date").textContent = `${formatDate(
        dayAftersDate
    )}`;

    document.querySelector(
        ".day-after img"
    ).src = `https:${dataObject.condition.icon}`;
    document.querySelector(
        ".day-after .max-min-temp"
    ).textContent = `${dataObject.maxtemp_c}°C / ${dataObject.mintemp_c}°C`;
    document.querySelector(
        ".day-after .chance-of-rain"
    ).textContent = `Chance of rain: ${dataObject.daily_chance_of_rain}%`;
}

// Function that checks if current time is day or night and returns true or false
function checkDay(dataObject) {
    return dataObject.current.is_day == 1 ? true : false;
}

//Function to calculate windspeed
function calcWindSpeed(dataObject) {
    //Get windspeed as km/hgit
    let windSpeedKph = dataObject.current.wind_kph;

    //Transfer into m/s
    let windSpeedMs = (windSpeedKph * 1000) / 3600;

    //Return results with .1 decimal accuracity
    return windSpeedMs.toFixed(1);
}

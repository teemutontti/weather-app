// Saving the dates each time the script is initialized
const todaysDate = new Date();
const tomorrowsDate = new Date(todaysDate);
const dayAftersDate = new Date(tomorrowsDate);
tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
dayAftersDate.setDate(dayAftersDate.getDate() + 2);
let temperatureUnit = "C";
let windSpeedUnit = "m/s";

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

// Change displayed units when this function is called
function toggleUnits() {
    if (temperatureUnit == "C" && windSpeedUnit == "m/s") {
        temperatureUnit = "F";
        windSpeedUnit = "mi/s";
    } else {
        temperatureUnit = "C";
        windSpeedUnit = "m/s";
    }
    getWeather();
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

    updateToday(dataArr.today);
    updateTomorrow(dataArr.tomorrow);
    updateDayAfter(dataArr.dayAfter);
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

    if (temperatureUnit == "C" && windSpeedUnit == "m/s") {
        document.querySelector(
            ".today .temperature"
        ).textContent = `${dataObject.current.temp_c}°C`;
        document.querySelector(
            ".today .max-min-temp"
        ).textContent = `${dataObject.forecast.forecastday[0].day.maxtemp_c} / ${dataObject.forecast.forecastday[0].day.mintemp_c} °C`;
        document.querySelector(
            ".today .wind"
        ).textContent = `${calcWindSpeedFromKph(dataObject)} m/s`;
    } else {
        document.querySelector(
            ".today .temperature"
        ).textContent = `${dataObject.current.temp_f}°F`;
        document.querySelector(
            ".today .max-min-temp"
        ).textContent = `${dataObject.forecast.forecastday[0].day.maxtemp_f} / ${dataObject.forecast.forecastday[0].day.mintemp_f} °F`;
        document.querySelector(
            ".today .wind"
        ).textContent = `${calcWindSpeedFromMph(dataObject)} mi/s`;
    }
    document.querySelector(".today .city").textContent =
        dataObject.location.name;
    document.querySelector(".today img").src = "http:" + iconUrl;
    document.querySelector(".today .info").textContent =
        dataObject.current.condition.text;
}

//Function for returning tomorrows weather to html <-- Teemu
function updateTomorrow(dataObject) {
    if (temperatureUnit == "C") {
        document.querySelector(
            ".tomorrow .max-min-temp"
        ).textContent = `${dataObject.maxtemp_c} / ${dataObject.mintemp_c} °C`;
    } else {
        document.querySelector(
            ".tomorrow .max-min-temp"
        ).textContent = `${dataObject.maxtemp_f} / ${dataObject.mintemp_f} °F`;
    }
    document.querySelector(".tomorrow .date").textContent = `${formatDate(
        tomorrowsDate
    )}`;
    document.querySelector(
        ".tomorrow img"
    ).src = `https:${dataObject.condition.icon}`;
    document.querySelector(
        ".tomorrow .chance-of-rain"
    ).textContent = `${dataObject.daily_chance_of_rain}%`;
}

//Function for returning day after tomorrows weather to html <-- Noora
function updateDayAfter(dataObject) {
    if (temperatureUnit == "C") {
        document.querySelector(
            ".day-after .max-min-temp"
        ).textContent = `${dataObject.maxtemp_c} / ${dataObject.mintemp_c} °C`;
    } else {
        document.querySelector(
            ".day-after .max-min-temp"
        ).textContent = `${dataObject.maxtemp_f} / ${dataObject.mintemp_f} °F`;
    }

    document.querySelector(".day-after .date").textContent = `${formatDate(
        dayAftersDate
    )}`;
    document.querySelector(
        ".day-after img"
    ).src = `https:${dataObject.condition.icon}`;
    document.querySelector(
        ".day-after .chance-of-rain"
    ).textContent = `${dataObject.daily_chance_of_rain}%`;
}

// Function that checks if current time is day or night and returns true or false
function checkDay(dataObject) {
    return dataObject.current.is_day == 1 ? true : false;
}

//Function to calculate windspeed
function calcWindSpeedFromKph(dataObject) {
    //Get windspeed as km/h
    let windSpeedKph = dataObject.current.wind_kph;

    //Transfer into m/s
    let windSpeedMs = (windSpeedKph * 1000) / 3600;

    //Return results with .1 decimal accuracity
    return windSpeedMs.toFixed(1);
}
function calcWindSpeedFromMph(dataObject) {
    //Get windspeed as mi/h
    let windSpeedMph = dataObject.current.wind_mph;

    //Transfer into mi/s
    let windSpeedMis = (windSpeedMph * windSpeedMph) / 3600;

    //Return results with .1 decimal accuracity
    return windSpeedMis.toFixed(1);
}

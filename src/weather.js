// Saving the dates each time the script is initialized
const todaysDate = new Date();
const tomorrowsDate = new Date(todaysDate);
const dayAftersDate = new Date(tomorrowsDate);
tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
dayAftersDate.setDate(dayAftersDate.getDate() + 1);

//Function for fetching info from html input <-- Mikko
function getWeather() {
    let city = document.getElementById("city").value;

    fetchWeather(city);
}

//Function for fetching weather <-- Mikko
async function fetchWeather(city) {
    const apiKey = "e15e748acfc2424f9df135245232809";
    let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    let hr = await fetch(url);
    let data = await hr.json(); // Parse data to json Author: Noora
    let dataArr = parsedData(data); // Parse data to object Author: Noora

    updateToday(dataArr.today); // Update data to HTML Author: Mikko
    updateTomorrow(dataArr.tomorrow); // Update data to HTML Author: Teemu
    updateDayAfter(dataArr.dayAfter); // Update data to HTML Author: Noora
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

    //Change website background if its day or night
    if (day) {
        document.body.style.backgroundImage = "url(./pics/daybg.jpg)";
    } else {
        document.body.style.backgroundImage = "url(./pics/nightbg.jpg)";
    }

    //Change website information based on retrieved data from API
    document.querySelector(".today .city").textContent =
        dataObject.location.name;
    document.querySelector(".today img").src =
        "http:" + dataObject.current.condition.icon;
    document.querySelector(".today .info").textContent =
        dataObject.current.condition.text;
    document.querySelector(
        ".today .temperature"
    ).textContent = `Temperature: ${dataObject.current.temp_c}°C`;
    document.querySelector(
        ".today .min-temp"
    ).textContent = `Min temp: ${dataObject.forecast.forecastday[0].day.mintemp_c}°C`;
    document.querySelector(
        ".today .max-temp"
    ).textContent = `Max temp: ${dataObject.forecast.forecastday[0].day.maxtemp_c}°C`;
}

//Function for returning tomorrows weather to html <-- Teemu
function updateTomorrow(dataObject) {
    document.querySelector(
        ".tomorrow .date"
    ).textContent = `${tomorrowsDate.toDateString()}`;
    document.querySelector(
        ".tomorrow img"
    ).src = `https:${dataObject.condition.icon}`;
    document.querySelector(
        ".tomorrow .min-temp"
    ).textContent = `Min temp: ${dataObject.mintemp_c}°C`;
    document.querySelector(
        ".tomorrow .max-temp"
    ).textContent = `Max temp: ${dataObject.maxtemp_c}°C`;
    document.querySelector(
        ".tomorrow .chance-of-rain"
    ).textContent = `Chance of rain: ${dataObject.daily_chance_of_rain}%`;
}

//Function for returning day after tomorrows weather to html <-- Noora
function updateDayAfter(dataObject) {
    //const icon TO DO
    //const minTemp TO DO
    //const maxTemp TO DO
    //const chanceOfRain TO DO
    console.log(dataObject);
}

// Function that checks if current time is day or night and returns true or false
function checkDay(dataObject) {
    return dataObject.current.is_day == 1 ? true : false;
}

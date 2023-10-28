import { parsedData, formatDate, calcWindSpeedFromKph, isDay, changeBackground } from "./helper.js";

// Saving the dates each time the script is initialized
const todaysDate = new Date();
const tomorrowsDate = new Date(todaysDate);
const dayAftersDate = new Date(tomorrowsDate);
tomorrowsDate.setDate(tomorrowsDate.getDate() + 1);
dayAftersDate.setDate(dayAftersDate.getDate() + 2);
let temperatureUnit = "C";
let windSpeedUnit = "m/s";
var originalSearch = "";
let dataObj;

//Function for fetching info from html input <-- Mikko
function getWeather() {
    let searchedCity = document.getElementById("field").value;
    originalSearch = searchedCity;
    let city = checkCityName(searchedCity);
    fetchWeather(city);
}

//Function to make all city names readable for the fetch <-- Jenny
function checkCityName(searchedCity) {
    let city = searchedCity;
    let finnishVowels = { ä: "a", Ä: "A", ö: "o", Ö: "O", å: "a", Å: "A" };

    for (let letter of searchedCity) {
        if (letter in finnishVowels) {
            city = city.replace(letter, finnishVowels[letter]);
        }
    }
    return city;
}

//Function to check if header should use location name from API
// or use formatted version of the original search word <-- Jenny
function outputCityName(cityFromAPI) {
    if (cityFromAPI.toLowerCase() == checkCityName(originalSearch).toLowerCase()) {
        let formattedName = originalSearch.charAt(0).toUpperCase() + originalSearch.slice(1);
        return formattedName;
    }
    return cityFromAPI;
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

// Add onclick event for toggle switch to switch units
document.querySelector("label.toggle").addEventListener("click", toggleUnits);

//// Add onclick event for searchbar
document.getElementById("icon").addEventListener("click", getWeather);

//Function for fetching weather <-- Mikko
async function fetchWeather(city) {
    const apiKey = "e15e748acfc2424f9df135245232809";
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

    let hr = await fetch(url);
    let data = await hr.json();
    dataObj = parsedData(data);

    updateData(dataObj);

    setAfterSearchStyle();
}

function updateData(fetchedData) {
    updateToday(fetchedData.today);
    updateTomorrow(fetchedData.tomorrow);
    updateDayAfter(fetchedData.dayAfter);
}

//Function for returning current weather to html <-- Jenny
function updateToday(dataObject) {
    changeBackground(isDay(dataObject));
    let iconUrl = dataObject.current.condition.icon.replace("64x64", "128x128");

    //Change website information based on retrieved data from API
    if (temperatureUnit == "C" && windSpeedUnit == "m/s") {
        document.querySelector(".today .temperature").textContent = `${Math.floor(dataObject.current.temp_c)}`;
        document.querySelector(".today .units").textContent = `°C`; // new
        document.querySelector(".today .max-min-temp").textContent = `${Math.floor(
            dataObject.forecast.forecastday[0].day.maxtemp_c
        )} ° / ${Math.floor(dataObject.forecast.forecastday[0].day.mintemp_c)} °`;
        document.querySelector(".today .wind").textContent = `${calcWindSpeedFromKph(dataObject)} m/s`;
    } else {
        document.querySelector(".today .temperature").textContent = `${Math.floor(dataObject.current.temp_f)}`;
        document.querySelector(".today .units").textContent = `°F`; // new
        document.querySelector(".today .max-min-temp").textContent = `${Math.floor(
            dataObject.forecast.forecastday[0].day.maxtemp_f
        )} ° / ${Math.floor(dataObject.forecast.forecastday[0].day.mintemp_f)} °`;
        document.querySelector(".today .wind").textContent = `${dataObject.current.wind_mph} mi/h`;
    }
    document.querySelector(".today .city").textContent = outputCityName(dataObject.location.name);
    document.querySelector(".today img").src = "https:" + iconUrl;
    document.querySelector(".today .info").textContent = dataObject.current.condition.text;
    document.querySelector(".today .humidity").textContent = `${dataObject.current.humidity} %`;
}

//Function for returning tomorrows weather to html <-- Teemu
function updateTomorrow(dataObject) {
    if (temperatureUnit == "C") {
        document.querySelector(".tomorrow .max-min-temp").textContent = `${Math.floor(dataObject.maxtemp_c)} ° / ${Math.floor(
            dataObject.mintemp_c
        )} °`;
    } else {
        document.querySelector(".tomorrow .max-min-temp").textContent = `${Math.floor(dataObject.maxtemp_f)} ° / ${Math.floor(
            dataObject.mintemp_f
        )} °`;
    }
    document.querySelector(".tomorrow .date").textContent = `${formatDate(tomorrowsDate)}`;
    document.querySelector(".tomorrow img").src = `https:${dataObject.condition.icon}`;
    document.querySelector(".tomorrow .chance-of-rain").textContent = `${dataObject.daily_chance_of_rain} %`;
}

//Function for returning day after tomorrows weather to html <-- Noora
function updateDayAfter(dataObject) {
    if (temperatureUnit == "C") {
        document.querySelector(".day-after .max-min-temp").textContent = `${Math.floor(dataObject.maxtemp_c)} ° / ${Math.floor(
            dataObject.mintemp_c
        )} °`;
    } else {
        document.querySelector(".day-after .max-min-temp").textContent = `${Math.floor(dataObject.maxtemp_f)} ° / ${Math.floor(
            dataObject.mintemp_f
        )} °`;
    }

    document.querySelector(".day-after .date").textContent = `${formatDate(dayAftersDate)}`;
    document.querySelector(".day-after img").src = `https:${dataObject.condition.icon}`;
    document.querySelector(".day-after .chance-of-rain").textContent = `${dataObject.daily_chance_of_rain} %`;
}

function setAfterSearchStyle() {
    document.querySelector("main").style.display = "block";

    document.querySelector("body").style.display = "block";
    document.querySelector("body").classList.add("search-done");

    document.querySelector("header").style.background = "none";
    document.querySelector("header").style.paddingBottom = "0px";
}

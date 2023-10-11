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
    const city = document.querySelector(".today .city");
    const icon = document.querySelector(".today img");
    const info = document.querySelector(".today .info");
    const temperature = document.querySelector(".today .temperature");
    const minTemp = document.querySelector(".today .min-temp");
    const maxTemp = document.querySelector(".today .max-temp");

    city.textContent = dataObject.location.name;
    icon.src = "http:" + dataObject.current.condition.icon;
    info.textContent = dataObject.current.condition.text;
    temperature.textContent = `Temperature: ${dataObject.current.temp_c}°C`;
    minTemp.textContent = `Min temp: ${dataObject.forecast.forecastday[0].day.mintemp_c}°C`;
    maxTemp.textContent = `Max temp: ${dataObject.forecast.forecastday[0].day.maxtemp_c}°C`;
}

//Function for returning tomorrows weather to html <-- Teemu
function updateTomorrow(dataObject) {
    console.log(dataObject);
}

//Function for returning day after tomorrows weather to html <-- Teemu

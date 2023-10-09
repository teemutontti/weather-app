const apiKey = "e15e748acfc2424f9df135245232809";

//Function for fetching info from html input

//Function for fetching weather
async function fetchWeather(city) {
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  let hr = await fetch(url);
  return hr;
}

//Function for parseing fetched data

//Function for returning current weather to html

//Function for returning tomorrows weather to html

//Function for returning day after tomorrows weather to html

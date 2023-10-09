//Function for fetching info from html input <-- undefined

//Function for fetching weather <-- Mikko
async function fetchWeather(city) {
  const apiKey = "e15e748acfc2424f9df135245232809";
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;

  let hr = await fetch(url);
  let data = await hr.json();  // Parse data to json Author: Noora
  let dataArr = parsedData(data); // Parse data to array Author: Noora

  updateTomorrow(dataArr.tomorrow); // Update data to HTML Author: Teemu

  return dataArr;


}

//Function for parseing fetched data <-- Noora
function parsedData (data) {
  let today = data.forecast.forecastday[0];
  let tomorrow = data.forecast.forecastday[1];
  let dayAfter = data.forecast.forecastday[2];

  return {
    today: today,
    tomorrow: tomorrow,
    dayAfter: dayAfter
  };

}

//Function for returning current weather to html <-- Jenny

//Function for returning tomorrows weather to html <-- Teemu
function updateTomorrow(dataObject) {

}

//Function for returning day after tomorrows weather to html <-- Teemu

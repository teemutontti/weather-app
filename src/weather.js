const apiKey = "e15e748acfc2424f9df135245232809";

function fetchWeather(city) {
  let url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3`;
}

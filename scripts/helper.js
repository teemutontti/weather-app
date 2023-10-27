// Function for parseing API data into more manageable objects
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

//Function for returning date in a formatted matter
const formatDate = (date) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return date.toLocaleDateString("en-US", options);
};

//Function to calculate windspeed to meters per second
function calcWindSpeedFromKph(dataObject) {
    //Get windspeed as km/h
    let windSpeedKph = dataObject.current.wind_kph;

    //Transfer into m/s
    let windSpeedMs = (windSpeedKph * 1000) / 3600;

    //Return results with .1 decimal accuracity
    return windSpeedMs.toFixed(1);
}

// Function that checks if current time is day or night and returns true or false
function isDay(dataObject) {
    return dataObject.current.is_day == 1 ? true : false;
}

export { parsedData, formatDate, calcWindSpeedFromKph, isDay };

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

export { parsedData, formatDate };

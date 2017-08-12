 
// global variables
var latitude; 
var longitude;
var apiUrl; 
var cityName;
var weatherCondition;
var temperature;

// find out user's location and display all items onload
navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    displayItems();
});

// get json from api and receive items to be displayed
function displayItems() {
    apiUrl = "https://fcc-weather-api.glitch.me/api/current?" 
    + "lat=" + latitude 
    + "&lon=" + longitude;
    fetch(apiUrl)
    .then(function(response) {
        return response.json();
    })
    .then(getItems);
}

// different items for app
function getItems(data) {
    getWeather(data);
    getIcon(weatherCondition);
    getTemperature(data);
    getLocation(data);
}

// display location eg. Homebush
function getLocation(data) {
    var locationDisplay = document.querySelector(".location");
    cityName = data.name;
    locationDisplay.innerHTML = cityName;
}

// display weather condition eg. clear, clouds, rain
function getWeather(data) {
    var weatherDisplay = document.querySelector(".weather");
    weatherCondition = data.weather[0].main;
    weatherDisplay.innerHTML = weatherCondition;
}

// display weather icon that matches with weather condition
function getIcon(weatherCondition) {
    var weatherIcon = document.getElementById("weather-icon");
    switch(weatherCondition) {
        case "Thunderstorm":
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502190131/storm_ilfus1.svg";
        break;
        case "Drizzle":
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502193618/drizzle_qsxgys.svg";
        break;
        case "Rain":
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502191524/rain_dq739q.svg";
        break;
        case "Snow":
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502155344/snow_cbtm7l.svg";
        case "Clear": 
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502188386/sunny_xmwsvi.svg";
        break;
        case "Clouds":
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502154653/cloud_x4uqwd.svg";
        break;
    }
}

function getTemperature(data) {
    var temperatureDisplay = document.querySelector(".temperature");
    temperature = Math.round(data.main.temp);
    temperatureDisplay.innerHTML = temperature;
}





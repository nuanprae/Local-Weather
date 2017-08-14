 
// global variables
var latitude; 
var longitude;
var apiUrl; 
var weatherCondition;
var cTemperature;

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
    getBackground(data);
    getWeather(data);
    getIcon(weatherCondition);
    getTemperature(data);
    getLocation(data);
    showElement();
    hideElement();
}

// display location eg. Homebush
function getLocation(data) {
    var locationDisplay = document.querySelector(".location");
    var cityName = data.name;
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
        break;
        case "Atmosphere":
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502693302/atmosphere_ik9dtt.svg";
        break;
        case "Clear": 
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502188386/sunny_xmwsvi.svg";
        break;
        case "Clouds":
        weatherIcon.src = "http://res.cloudinary.com/dk7wue4rl/image/upload/v1502154653/cloud_x4uqwd.svg";
        break;
    }
}

// get temperature from api in celsius
function getTemperature(data) {
    var temperatureDisplay = document.querySelector(".temperature");
    cTemperature = Math.round(data.main.temp);
    temperatureDisplay.innerHTML = cTemperature;
}

// onclick radio button-f change to Fahrenheit
function changeToFahrenheit() {
    var temperatureDisplay = document.querySelector(".temperature");
    var fTemperature = Math.round(cTemperature * 1.8 + 32);
    temperatureDisplay.innerHTML = fTemperature;
}

// onclick radio button-c change back to Celsius
function changeToCelsius() {
    var temperatureDisplay = document.querySelector(".temperature");
    temperatureDisplay.innerHTML = cTemperature;
}

// different backgrounds for night and day time based on sunrise and sunset
function getBackground(data) {
    var timeStamp = Math.floor(Date.now()/1000);
    var sunrise = data.sys.sunrise;
    var sunset = data.sys.sunset;
    var appBackground = document.querySelector(".app-background");
    
    if (timeStamp >= sunrise && timeStamp <= sunset) {
        appBackground.style.backgroundImage = "url(http://res.cloudinary.com/dk7wue4rl/image/upload/v1502083787/6972_qreom8.jpg)";     
    } else {
        appBackground.style.backgroundImage = "url(http://res.cloudinary.com/dk7wue4rl/image/upload/v1502154194/OR7W9B0_ixyxop.jpg)";
    }
}

// remove class once local weather has been retrieved
function hideElement() {
    var messageDisplay = document.querySelector(".message");
    messageDisplay.classList.add("hidden");
}

// onload display button-f and button-c to change between Fahrenheit and Celsius
function showElement() {
    var hiddenClass = document.querySelector(".hidden");
    hiddenClass.classList.remove("hidden"); 
}

// must be a better way of writing hideElement and showElement, so can be used over and over

// case Atmosphere is not showing weatherIcon

// still have to add two night icons 
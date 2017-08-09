 
var latitude; 
var longitude;
var apiUrl; 
var cityName;
var temperature;
var weatherCondition;

function displayItems() {
navigator.geolocation.getCurrentPosition(function(position) {
    latitude = position.coords.latitude;
    longitude = position.coords.longitude;
    apiCall();
});
}


function apiCall() {
    apiUrl = "https://fcc-weather-api.glitch.me/api/current?" 
    + "lat=" + latitude 
    + "&lon=" + longitude;
    fetchJSON();
}

function fetchJSON() {
    fetch(apiUrl)
    .then((resp) => resp.json())
    .then(function(data) {
        var location = document.querySelector(".location");
        cityName = data.name;
        temperature = data.main.temp;
        weatherCondition = data.weather[0].main;
        location.innerHTML = cityName;
    });
}







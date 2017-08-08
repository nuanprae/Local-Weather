
// display user location if able to retrieve location from api
function geoSuccess(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var location = document.querySelector(".location");
    var api = "https://fcc-weather-api.glitch.me/api/current?" 
    + "lat=" + latitude 
    + "&lon=" + longitude;

// load json file from url
fetch(api)
.then((resp) => resp.json()) 
.then(function(data) {
    var cityName = data.name;
    location.innerHTML = cityName;
}) 
}

// display error message if unable to get location from API
function geoError() {
    alert("Unable to retrieve your location.");
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}


// get temperature and weather condition from openweathermap


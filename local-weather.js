var latitude;
var longitude;

// load json file from url
function getJSON(url, callback) {
    var request = new XMLHttpRequest();
    request.open("GET", url, true);
    request.onload = function() {
        if (request.status >= 200 && request.status < 400) {
    // Success!
        var data = JSON.parse(request.responseText);
        } else {
    // We reached our target server, but it returned an error
        }
    };
    request.onerror = function() {
  // There was a connection error of some sort
    };
    request.send();
}

// display user location if able to retrieve location from api
function geoSuccess(position) {
    var latitude  = position.coords.latitude;
    var longitude = position.coords.longitude;
    var location = document.querySelector(".location");
    var api = "api.openweathermap.org/data/2.5/weather?" 
    + "lat=" + latitude 
    + "&lon=" + longitude 
    + "&units=metric" 
    + "&APPID=b67c754d8b9dac8134657159e3c93c8c";
    
    getJSON(api, function(data) {
    var cityName = data.name;
    location.innerHTML = cityName;
    });
}

// display error message if unable to get location from API
function geoError() {
    alert("Unable to retrieve your location.");
}

function getLocation() {
    navigator.geolocation.getCurrentPosition(geoSuccess, geoError);
}


// get temperature and weather condition from openweathermap


var temp = document.getElementById("degree");
var searchbtn = document.getElementById("search");
var inputval = document.getElementById("searchval");
var city = document.getElementById("city");
var statuss = document.getElementById("status");
var humi = document.querySelector(".humi span");
var winds = document.querySelector(".winds span");
var uvs = document.querySelector(".uvs span");
var pre = document.querySelector(".pre span");
var mxtemp = document.querySelector(".maxtemp span");
var mntemp = document.querySelector(".mintemp span");
var sunrise = document.querySelector(".sunrise span");
var sunset = document.querySelector(".sunset span");
var imgg = document.getElementById("conditionimg");

let target = "Pune"; // Default location

const API_KEY = "d1dc3691ac454446bf5173858232803"; // Replace with your WeatherAPI key

document.addEventListener("DOMContentLoaded", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(success, error);
    } else {
        alert("Geolocation is not supported by this browser.");
        fetchResult(target); // Fetch for default city
    }
});

function success(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    fetchWeatherByCoords(lat, lon);
}

function error() {
    alert("Location access denied. Using default city: Pune");
    fetchResult(target);
}

async function fetchWeatherByCoords(lat, lon) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${lat},${lon}&days=1&aqi=no&alerts=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        updateWeather(data);
    } catch (err) {
        console.error("Error fetching weather data:", err);
    }
}

async function fetchResult(targetLocation) {
    let url = `https://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${targetLocation}&days=1&aqi=no&alerts=no`;

    try {
        const res = await fetch(url);
        const data = await res.json();
        updateWeather(data);
    } catch (err) {
        console.error("Error fetching weather data:", err);
    }
}

function updateWeather(data) {
    let { temp_c, condition, humidity, wind_kph, uv } = data.current;
    let { maxtemp_c, mintemp_c, daily_chance_of_rain } = data.forecast.forecastday[0].day;
    let { sunrise, sunset } = data.forecast.forecastday[0].astro;
    let cityName = data.location.name;
    let statusVal = condition.text;
    let iconURL = "https:" + condition.icon;

    temp.innerHTML = temp_c;
    city.innerHTML = cityName;
    statuss.innerHTML = statusVal;
    humi.innerHTML = humidity + "%";
    winds.innerHTML = wind_kph + " km/h";
    uvs.innerHTML = uv;
    pre.innerHTML = daily_chance_of_rain + "%";
    mxtemp.innerHTML = maxtemp_c + "°C";
    mntemp.innerHTML = mintemp_c + "°C";
    sunrise.innerHTML = sunrise;
    sunset.innerHTML = sunset;
    imgg.src = iconURL;
}

function val(e) {
    e.preventDefault();
    target = inputval.value;
    fetchResult(target);
}

searchbtn.addEventListener("click", val);

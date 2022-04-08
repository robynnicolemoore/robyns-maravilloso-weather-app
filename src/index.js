//Display time

function displayDateAndTime(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let dayIndex = currentTime.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saurday",
  ];
  return `${days[dayIndex]} ${hours}:${minutes}`;
}

let dateTime = document.querySelector("#date");
let currentTime = new Date();
date.innerHTML = displayDateAndTime(date);

//Convert Temperature
function convertToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperature = Number(temperature);
  temperatureElement.innerHTML = Math.round((temperature * 9) / 5 + 32);
}

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = temperatureElement.innerHTML;
  temperatureElement.innerHTML = Math.round(((temperature - 32) * 5) / 9);
}

let temperatureF = document.querySelector("#fahrenheit-link");
temperatureF.addEventListener("click", convertToF);

let temperatureC = document.querySelector("#celsius-link");
temperatureC.addEventListener("click", convertToC);

//Search City

function search(event) {
  event.preventDefault();
  let city = document.querySelector("#new-city-input").value;
  let apiUrlCity = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=c13ec1823489873786dad083e25adf72&units=metric`;
  axios.get(apiUrlCity).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#current-humidity").innerHTML =
    response.data.main.humidity;
  document.querySelector("#current-wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
}

//Current Location Weather

function loadPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(getPosition);
}

function getPosition(position) {
  latitude = position.coords.latitude;
  longitude = position.coords.longitude;
  let apiKey = "c13ec1823489873786dad083e25adf72";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
let currentWeatherSearch = document.querySelector("#current-weather-search");
currentWeatherSearch.addEventListener("click", loadPosition);
let weatherSearch = document.querySelector("button");
weatherSearch.addEventListener("click", search);

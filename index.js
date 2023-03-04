// time and day of the week
function formatDate(now) {
let hour = now.getHours();
if (hour < 10) {
  hour = `0${hour}`;
}
let minute = now.getMinutes();
if (minute < 10) {
  minute = `0${minute}`;
}

let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let dayOfWeek = days[now.getDay()];


  return `${dayOfWeek} ${hour}:${minute}`;
}

let dateElement = document.querySelector("#date");
let now = new Date();
dateElement.innerHTML = formatDate(now);

// local temperature + temperature on requested city

let apiKey = "445905dadb3d2b0c6f1b916c9d0e3860";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?appid=${apiKey}&units=${units}`;

function showTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let city = response.data.name;
  let message = `The temperature in ${city} is ${temperature}°C`;
  let h6 = document.querySelector("#temperature");
  h6.innerHTML = message;
}

function getCurrentLocation() {
  navigator.geolocation.getCurrentPosition(function(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    apiUrl = `${apiUrl}&lat=${latitude}&lon=${longitude}`;
    axios.get(apiUrl).then(showTemperature);
  });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", function(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let city = cityInput.value;
  apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showTemperature);
});

let currentButton = document.querySelector(".location");
currentButton.addEventListener("click", function() {
  getCurrentLocation();
});
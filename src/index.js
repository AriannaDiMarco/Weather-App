let now = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[now.getDay()];
let date = now.getDate();
let months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let month = months[now.getMonth()];
let actualDate = document.querySelector("#date");
actualDate.innerHTML = `${day}, ${date} ${month}`;
let actualHour = now.getHours();
let actualMinutes = now.getMinutes();
let actualTime = document.querySelector("#time");

if (actualMinutes < 10) {
  actualTime.innerHTML = `${actualHour}:0${actualMinutes}`;
} else {
  actualTime.innerHTML = `${actualHour}:${actualMinutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `         <div class="col-3">
                </br><em>
                  ${formatDay(forecastDay.dt)}</em>
                  </div>
                <div class="col-3" id="forecast-icon">
                  </br>
                  <img src = "https://openweathermap.org/img/wn/${
                    forecastDay.weather[0].icon
                  }@2x.png" width="40"/>
                  </div>
                <div class="col-3" id="min">
                </br>
                  <span><strong>${Math.round(
                    forecastDay.temp.min
                  )}°C</strong></span>
                   </div>
                <div class="col-3" id="max">
                 </br>
                  <span><strong>${Math.round(
                    forecastDay.temp.max
                  )}°C</strong></span>
                  </div>
                `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "5af0edc85cf70b7e91e5873cf898c017";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function displayRealTemp(response) {
  celsiusTemperature = response.data.main.temp;
  let temperature = Math.round(celsiusTemperature);
  let description = `${response.data.weather[0].description}`;
  description = description.toUpperCase();
  let value = document.querySelector("h1");
  value.innerHTML = `${temperature}°C`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${description}`;
  let windElement = document.querySelector("#wind-speed");
  let windSpeed = Math.round(response.data.wind.speed);
  windElement.innerHTML = `🌀 Wind: ${windSpeed} km/h`;
  let humidityElement = document.querySelector("#humidity-value");
  let humidityValue = Math.round(response.data.main.humidity);
  humidityElement.innerHTML = `💧 Humidity: ${humidityValue}%`;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function showCity(event) {
  event.preventDefault();
  let cityChosen = document.querySelector("#search-city");
  let cityShown = document.querySelector("#city");
  cityShown.innerHTML = `	${cityChosen.value}`;
  cityShown.innerHTML = cityShown.innerHTML.toUpperCase();
  let apiKey = "5af0edc85cf70b7e91e5873cf898c017";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityChosen.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayRealTemp);
}
let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", showCity);

function displayCurrent(response) {
  console.log(response);
  let currentCity = `${response.data.name}`;
  let currentTemp = Math.round(response.data.main.temp);
  let currentDescription = `${response.data.weather[0].description}`;
  currentDescription = currentDescription.toUpperCase();
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentTemp}°C`;
  let h2 = document.querySelector("h2");
  h2.innerHTML = `${currentDescription}`;
  let city = document.querySelector("#city");
  city.innerHTML = `${currentCity}`;
  city.innerHTML = city.innerHTML.toUpperCase();
  let weatherIcon = document.querySelector("#icon");
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function showCurrent(position) {
  let lat = `	${position.coords.latitude}`;
  let lon = `${position.coords.longitude}	`;
  let apiKey = "5af0edc85cf70b7e91e5873cf898c017";
  let apiUrl = `	https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayCurrent);
}
function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showCurrent);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", getCurrentPosition);

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-value");
  let fahrenheitTemp = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemp) + "°F";
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-value");
  temperatureElement.innerHTML = Math.round(celsiusTemperature) + "°C";
}

function search(city) {
  let apiKey = "5af0edc85cf70b7e91e5873cf898c017";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayRealTemp);
}
let celsiusTemperature = null;
let fahrenheitValue = document.querySelector("#fahrenheit");
fahrenheitValue.addEventListener("click", displayFahrenheitTemperature);
let celsiusValue = document.querySelector("#celsius");
celsiusValue.addEventListener("click", displayCelsiusTemperature);

search("Teramo");

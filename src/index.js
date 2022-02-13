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

function displayRealTemp(response) {
  let temperature = Math.round(response.data.main.temp);
  let description = `${response.data.weather[0].description}`;
  description = description.toUpperCase();
  let value = document.querySelector("h1");
  value.innerHTML = `${temperature}°C	</br> ${description}`;
}
function showCity(event) {
  event.preventDefault();
  let cityChosen = document.querySelector("#search-city");
  let cityShown = document.querySelector("#city");
  cityShown.innerHTML = `	${cityChosen.value}`;
  let apiKey = "5af0edc85cf70b7e91e5873cf898c017";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityChosen.value}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayRealTemp);
}
let searchButton = document.querySelector("form");
searchButton.addEventListener("submit", showCity);

//
function displayCurrent(response) {
  let currentCity = `${response.data.name}`;
  let currentTemp = Math.round(response.data.main.temp);
  let currentDescription = `${response.data.weather[0].description}`;
  currentDescription = currentDescription.toUpperCase();
  let h1 = document.querySelector("h1");
  h1.innerHTML = `${currentTemp}°C </br> ${currentDescription}`;
  let city = document.querySelector("#city");
  city.innerHTML = `${currentCity}`;
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

//function showF() {
//let valueF = document.querySelector("#tempValue");
//valueF.innerHTML = "48°F </br> ⛅";
//}
//function showC() {
//let valueC = document.querySelector("#tempValue");
//valueC.innerHTML = "9°C </br> ⛅";
//}
//let celsius = document.querySelector("#celsius");
//let fahreneit = document.querySelector("#fahreneit");
//fahreneit.addEventListener("click", showF);
//celsius.addEventListener("click", showC);

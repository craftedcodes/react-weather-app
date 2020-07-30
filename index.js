///current date///
let today = document.querySelector("span#today");
let now = new Date();
console.log(now);
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let todays = days[now.getDay()];
console.log(todays);
today.innerHTML = `${todays}`;
let time = document.querySelector("span#time");
let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
console.log(now.getHours);
let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
console.log(now.getMinutes);
time.innerHTML = `${hours}:${minutes}`;

function formatForecastDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }

  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

///weather current location///
function showWeather(response) {
  celsiusTemperature = response.data.main.temp;
  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    celsiusTemperature
  );
  document.querySelector("#description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#currenthumidity").innerHTML = `${Math.round(
    response.data.main.humidity
  )}%`;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector("#icon")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
}

///API///
function searchCity(city) {
  let apiKey = "1f29a8457a11c97a01e380819aae6d53";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

let form = document.querySelector("#search-form");
form.addEventListener("click", handleSubmit);

function showPosition(position) {
  let apiKey = "1f29a8457a11c97a01e380819aae6d53";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let button = document.querySelector("#geolocation");
button.addEventListener("click", getCurrentPosition);
searchCity("Berlin");

function showForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;
  console.log(forecast);
  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2 card text-center">
              <li class="mb-1">
                ${formatForecastDate(forecast.dt * 1000)}
              </li>
              <li>
                <img src="http://openweathermap.org/img/wn/${
                  forecast.weather[0].icon
                }@2x.png"
                  class="lil-icn mb-1">
              </li>
              <li>
               <strong>${Math.round(
                 forecast.main.temp_max
               )}°</strong> ${Math.round(forecast.main.temp_min)}°
              </li>
            </div>`;
  }
}

///Celsius Fahrenheit///
let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", showFahrenheitTemperature);
let celsiusTemperature = null;

function showFahrenheitTemperature(event) {
  event.preventDefault();
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", showCelsiusTemperature);

function showCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

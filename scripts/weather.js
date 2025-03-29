const weatherDesc = document.getElementById('weather-desc');
const currentTemp = document.getElementById('current-temp');
const forecast = document.getElementById('forecast');

async function getWeather() {
  const response = await fetch("https://api.openweathermap.org/data/2.5/forecast?lat=35&lon=139&appid=YOUR_API_KEY&units=imperial");
  const data = await response.json();
  const today = data.list[0];

  currentTemp.textContent = `Temperature: ${Math.round(today.main.temp)}°F`;
  weatherDesc.textContent = `Conditions: ${today.weather.map(w => w.description).join(", ")}`;

  forecast.innerHTML = "";
  for (let i = 1; i <= 3; i++) {
    const temp = Math.round(data.list[i * 8].main.temp);
    const day = new Date(data.list[i * 8].dt_txt).toLocaleDateString(undefined, { weekday: 'short' });
    forecast.innerHTML += `<p>${day}: ${temp}°F</p>`;
  }
}

getWeather();

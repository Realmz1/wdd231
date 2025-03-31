const weatherDesc = document.getElementById('weather-desc');
const currentTemp = document.getElementById('current-temp');
const forecast = document.getElementById('forecast');

// San Miguel, El Salvador coordinates: 13.4833, -88.1833
const lat = 13.4833;
const lon = -88.1833;
const apiKey = 'bd5e378503939ddaee76f12ad7a97608';

async function getWeather() {
    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        );

        if (!response.ok) {
            throw new Error('Weather data not available');
        }

        const data = await response.json();
        const today = data.list[0];

        currentTemp.textContent = `Temperature: ${Math.round(today.main.temp)}°F`;
        weatherDesc.textContent = `Conditions: ${today.weather[0].description}`;

        // Display 3-day forecast
        forecast.innerHTML = "<h3>3-Day Forecast</h3>";
        for (let i = 1; i <= 3; i++) {
            const dayData = data.list[i * 8]; // Each day is 8 entries apart (3-hour intervals)
            const temp = Math.round(dayData.main.temp);
            const day = new Date(dayData.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' });
            forecast.innerHTML += `<p>${day}: ${temp}°F</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        weatherDesc.textContent = 'Weather data unavailable';
        currentTemp.textContent = '';
        forecast.innerHTML = '';
    }
}

getWeather(); 
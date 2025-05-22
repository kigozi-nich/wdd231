// Weather API Integration for Kampala Chamber of Commerce
// OpenWeatherMap API for Kampala, Uganda

const apiKey = '4caff26783d3941d4a43a6434e735511';
const lat = 0.3476;
const lon = 32.5825;

// API URLs
const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;

// DOM Elements
const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const weatherDescription = document.querySelector('#weather-description');
const forecastContainer = document.querySelector('#forecast-container');

// Fetch current weather data
async function fetchCurrentWeather() {
    try {
        const response = await fetch(currentWeatherUrl);
        if (response.ok) {
            const data = await response.json();
            displayCurrentWeather(data);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching current weather:', error);
        currentTemp.textContent = 'N/A';
        weatherDescription.textContent = 'Weather data unavailable';
    }
}

// Fetch 3-day forecast data
async function fetchWeatherForecast() {
    try {
        const response = await fetch(forecastUrl);
        if (response.ok) {
            const data = await response.json();
            displayWeatherForecast(data);
        } else {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
    } catch (error) {
        console.error('Error fetching weather forecast:', error);
        forecastContainer.innerHTML = '<p>Forecast data unavailable</p>';
    }
}

// Display current weather
function displayCurrentWeather(data) {
    const temp = Math.round(data.main.temp);
    const description = data.weather[0].description;
    const icon = data.weather[0].icon;
    
    currentTemp.innerHTML = `${temp}&deg;C`;
    weatherDescription.textContent = capitalizeWords(description);
    
    const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    weatherIcon.setAttribute('src', iconUrl);
    weatherIcon.setAttribute('alt', description);
}

// Display 3-day forecast
function displayWeatherForecast(data) {
    // Get daily forecasts (API returns 5-day forecast with 3-hour intervals)
    const dailyForecasts = getDailyForecasts(data.list);
    
    forecastContainer.innerHTML = '';
    
    // Display next 3 days
    for (let i = 1; i <= 3 && i < dailyForecasts.length; i++) {
        const forecast = dailyForecasts[i];
        const forecastCard = createForecastCard(forecast);
        forecastContainer.appendChild(forecastCard);
    }
}

// Process forecast data to get daily summaries
function getDailyForecasts(forecastList) {
    const dailyData = {};
    
    forecastList.forEach(item => {
        const date = new Date(item.dt * 1000);
        const dateKey = date.toDateString();
        
        if (!dailyData[dateKey]) {
            dailyData[dateKey] = {
                date: date,
                temps: [],
                weather: item.weather[0],
                humidity: item.main.humidity
            };
        }
        
        dailyData[dateKey].temps.push(item.main.temp);
    });
    
    // Convert to array and calculate average temperatures
    return Object.values(dailyData).map(day => ({
        date: day.date,
        avgTemp: Math.round(day.temps.reduce((a, b) => a + b, 0) / day.temps.length),
        maxTemp: Math.round(Math.max(...day.temps)),
        minTemp: Math.round(Math.min(...day.temps)),
        weather: day.weather,
        humidity: day.humidity
    }));
}

// Create forecast card element
function createForecastCard(forecast) {
    const card = document.createElement('div');
    card.className = 'forecast-card';
    
    const dayName = forecast.date.toLocaleDateString('en-US', { weekday: 'short' });
    const iconUrl = `https://openweathermap.org/img/wn/${forecast.weather.icon}.png`;
    
    card.innerHTML = `
        <div class="forecast-day">${dayName}</div>
        <img src="${iconUrl}" alt="${forecast.weather.description}" class="forecast-icon">
        <div class="forecast-temps">
            <span class="forecast-high">${forecast.maxTemp}&deg;</span>
            <span class="forecast-low">${forecast.minTemp}&deg;</span>
        </div>
        <div class="forecast-desc">${capitalizeWords(forecast.weather.description)}</div>
    `;
    
    return card;
}

// Utility function to capitalize words
function capitalizeWords(str) {
    return str.replace(/\w\S*/g, (txt) => 
        txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
    );
}

// Initialize weather data when page loads
document.addEventListener('DOMContentLoaded', () => {
    fetchCurrentWeather();
    fetchWeatherForecast();
});

// Refresh weather data every 10 minutes
setInterval(() => {
    fetchCurrentWeather();
    fetchWeatherForecast();
}, 600000);
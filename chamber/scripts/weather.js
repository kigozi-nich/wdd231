// Weather API JavaScript File
document.addEventListener('DOMContentLoaded', () => {
    // OpenWeatherMap API key - Replace with your actual API key
    const apiKey = 'YOUR_API_KEY_HERE'; // You'll need to get this from OpenWeatherMap
    
    // City for your Chamber of Commerce (Kampala, Uganda)
    const city = 'Kampala,ug';
    
    // Fetch current weather
    fetchCurrentWeather(city, apiKey);
    
    // Fetch forecast
    fetchForecast(city, apiKey);
});

// Function to fetch current weather
function fetchCurrentWeather(city, apiKey) {
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
    
    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Display current weather information
            document.getElementById('current-temp').textContent = Math.round(data.main.temp);
            document.getElementById('weather-desc').textContent = data.weather[0].description;
        })
        .catch(error => {
            console.error('Error fetching current weather:', error);
            document.getElementById('current-temp').textContent = 'Error';
            document.getElementById('weather-desc').textContent = 'Could not load weather data';
        });
}

// Function to fetch 3-day forecast
function fetchForecast(city, apiKey) {
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=imperial&appid=${apiKey}`;
    
    fetch(forecastUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Process forecast data for the next three days
            const forecastData = extractThreeDayForecast(data.list);
            
            // Display forecast
            for (let i = 0; i < forecastData.length; i++) {
                document.getElementById(`day${i+1}`).textContent = forecastData[i].day;
                document.getElementById(`temp${i+1}`).textContent = forecastData[i].temp;
            }
        })
        .catch(error => {
            console.error('Error fetching forecast:', error);
            for (let i = 1; i <= 3; i++) {
                document.getElementById(`day${i}`).textContent = 'Error';
                document.getElementById(`temp${i}`).textContent = '--';
            }
        });
}

// Extract 3-day forecast from API response (noon forecasts)
function extractThreeDayForecast(forecastList) {
    const today = new Date();
    const threeDayForecast = [];
    
    // Create a map to store the forecast for each day
    const forecastMap = new Map();
    
    // Process each forecast entry
    forecastList.forEach(item => {
        const forecastDate = new Date(item.dt * 1000);
        const forecastDay = forecastDate.getDate();
        
        // Skip today's forecasts
        if (forecastDay === today.getDate()) {
            return;
        }
        
        // Format the day name
        const dayName = forecastDate.toLocaleDateString('en-US', { weekday: 'short' });
        
        // If this is a new day, add it to our map
        if (!forecastMap.has(forecastDay)) {
            forecastMap.set(forecastDay, {
                day: dayName,
                forecasts: []
            });
        }
        
        // Add this forecast to the day's collection
        forecastMap.get(forecastDay).forecasts.push({
            time: forecastDate.getHours(),
            temp: Math.round(item.main.temp)
        });
    });
    
    // Convert map to array
    const daysArray = Array.from(forecastMap.values());
    
    // Take the first 3 days
    for (let i = 0; i < 3 && i < daysArray.length; i++) {
        const day = daysArray[i];
        
        // Find noon forecast or use the average
        let temp;
        const noonForecast = day.forecasts.find(f => f.time === 12);
        
        if (noonForecast) {
            temp = noonForecast.temp;
        } else {
            // Calculate average temperature
            const sum = day.forecasts.reduce((acc, f) => acc + f.temp, 0);
            temp = Math.round(sum / day.forecasts.length);
        }
        
        threeDayForecast.push({
            day: day.day,
            temp: temp
        });
    }
    
    return threeDayForecast;
}
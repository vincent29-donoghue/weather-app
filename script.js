const apiKey = '3f96ab2a126f4b334fd899b0d3fd3aaf';  // Your OpenWeatherMap API key
const searchButton = document.getElementById('search-btn');
const cityInput = document.getElementById('city-input');
const weatherInfo = document.getElementById('weather-info');
const errorMessage = document.getElementById('error-message');
const cityName = document.getElementById('city-name');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');

// Function to fetch weather data
const fetchWeather = async (city) => {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === '404') {
      // If the city is not found
      weatherInfo.classList.add('hidden');
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = "City not found. Please try again.";
    } else if (data.cod !== 200) {
      // If there's some other issue with the API request (e.g., invalid API key or rate limit reached)
      weatherInfo.classList.add('hidden');
      errorMessage.classList.remove('hidden');
      errorMessage.textContent = "Something went wrong! Please try again.";
    } else {
      // Check if the necessary fields are available before accessing them
      const country = data.sys && data.sys.country ? data.sys.country : 'Unknown';
      const cityNameText = `${data.name}, ${country}`;
      const temperatureText = `Temperature: ${data.main.temp}°C`;
      const descriptionText = `Weather: ${data.weather[0]?.description || 'N/A'}`;
      const humidityText = `Humidity: ${data.main.humidity}%`;
      const windSpeedText = `Wind Speed: ${data.wind.speed} m/s`;

      // If the city is found, display the weather
      errorMessage.classList.add('hidden');
      weatherInfo.classList.remove('hidden');
      cityName.textContent = cityNameText;
      temperature.textContent = temperatureText;
      description.textContent = descriptionText;
      humidity.textContent = humidityText;
      windSpeed.textContent = windSpeedText;
    }
  } catch (error) {
    // Log the error and display a friendly message
    console.error("Error fetching weather data:", error);
    weatherInfo.classList.add('hidden');
    errorMessage.classList.remove('hidden');
    errorMessage.textContent = "Error fetching data. Please try again later.";
  }
};

// Event listener for search button
searchButton.addEventListener('click', () => {
  const city = cityInput.value.trim();
  if (city) {
    fetchWeather(city);
  }
});

// Allow enter key to trigger search
cityInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    const city = cityInput.value.trim();
    if (city) {
      fetchWeather(city);
    }
  }
});


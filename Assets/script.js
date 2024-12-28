import dayjs from 'dayjs';
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherDescription = document.getElementById("weatherDescription");
const todaysDate = dayjs().format('M/DD/YYYY');
const apiKey = "8160474e6f23dd64a3ea9a9e05d2989d";
let cityList = document.querySelector(".cityList");
let searchedCities = [];


const fetchWeatherData = async (searchInput, apiKey) => {
  const baseUrl = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`;
  
  try {
    const response = await fetch(baseUrl);
    const data = await response.json();
    return {
      temperature: Math.floor(data.main.temp),
      cityName: data.name,
      weather: data.weather[0],
      icon: `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`
    };
  } catch (err) {
    console.error('Error fetch err');
    return null;
  }
};

const displayWeatherInfo = (weatherData) => {
  const displayMap = {
    temperature: (temp) => `${temp}℉`,
    location: (name) => `Current conditions for ${name}`,
    weatherDescription: (desc) => desc,
    weatherIcon: (icon) => {
      const weatherIcon = document.getElementById("weatherIcon");
      weatherIcon.setAttribute("src", icon);
      return weatherIcon;
    }
  };

  Object.entries(weatherData).forEach(([key, value]) => {
    const element = document.getElementById(key);
    if (element) {
      element.innerHTML = displayMap[key](value);
    }
  });
};


searchButton.addEventListener('click', async (e) => {
  e.preventDefault();
  const searchInput = cityInput.value.trim();
  const weatherData = await fetchWeatherData(searchInput, apiKey);
  
  if (weatherData) {
    displayWeatherInfo({
      temperature: weatherData.temperature,
      location: weatherData.cityName,
      weatherDescription: weatherData.weather.description,
      weatherIcon: weatherData.icon
    });
  }
});


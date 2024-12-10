import dayjs from 'dayjs';
const cityInput = document.getElementById("cityInput");
const searchButton = document.getElementById("searchButton");
const weatherDescription = document.getElementById("weatherDescription");
const todaysDate = dayjs().format('M/DD/YYYY');
const apiKey = "8160474e6f23dd64a3ea9a9e05d2989d";
let cityList = document.querySelector(".cityList");
let searchedCities = [];


const getCurrentTemperature = () => {
  const searchInput = cityInput.value.trim();
    const currentTemp = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`
    fetch(currentTemp).then(res => res.json())
      .then(data => {
        console.log(data);
        return data.main;
      })
      .then(data => `${displayDataResult("temperature", Math.floor(data.temp))}`)
      .catch(err => err);
};

const getCityName = () => {
  const searchInput = cityInput.value.trim();
    const currentCity = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`
    fetch(currentCity).then(res => res.json())
      .then(data => data.name)
      .then(name => `${displayDataResult("location", name)}`)
      .catch(err => err);
}

const getWeatherDescription = () => {
  const searchInput = cityInput.value.trim();
    const currentWeather = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`
    fetch(currentWeather).then(res => res.json())
      .then(data => data.weather)
      .then(weather => `${displayDataResult("weatherDescription", weather[0].description)}`)
      .catch(err => err);
}

const getWeatherIcon = () => {
  const searchInput = cityInput.value.trim();
    const currentIcon = `https://api.openweathermap.org/data/2.5/weather?q=${searchInput}&appid=${apiKey}&units=imperial`
    fetch(currentIcon).then(res => res.json())
      .then(data => data.weather)
      .then(weather => {
        const weatherIcon = document.getElementById("weatherIcon")
        const iconUrl = `https://openweathermap.org/img/wn/${weather[0].icon}.png`;
        weatherIcon.setAttribute("src", iconUrl)
        return `${displayDataResult("weatherIcon", weatherIcon)}`
      })
      .catch(err => err);
}


const displayDataResult = (elementId, info) => {
  const displayElement = document.getElementById(elementId);
  if (elementId === "temperature") {
    displayElement.innerHTML = `${info}℉`;
  } else if (elementId === "date") {
    displayElement.innerHTML = `Today is: ${info}`;
  } else if (elementId === "location") {
    displayElement.innerHTML = `Current conditions for ${info} `;
  } else if (elementId === "weatherDescription") {
    displayElement.innerHTML = `${info}`;
  } else if (elementId === "weatherIcon") {
    displayElement.innerHTML = `${info}`;
  }
  return displayElement;
}


  searchButton.addEventListener('click', (e) => {
    e.preventDefault()
    getCurrentTemperature();
    getCityName();
    getWeatherDescription();
    getWeatherIcon();
  })
  displayDataResult("date", `${todaysDate}`);

/* function weatherSearch(event)  {
    event.preventDefault();
     weatherDisplay.innerHTML="";
     

   
    const forecast = `https://api.openweathermap.org/data/2.5/forecast?q=${searchInput}&appid=${apiKey}&units=imperial`
    fetch(forecast).then(function (response){
      if(response.ok){
        response.json().then(function (data) {
          fiveDay(data)
        });
      }
    });

    searchedCities.push(searchInput)
    searchBarText.value = "";
    storeCities();
    renderPast();
    
    
     } else {
      window.alert("Please enter a city name");
      return;
     }

}; */





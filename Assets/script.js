const apiKey = "8160474e6f23dd64a3ea9a9e05d2989d";
let requestUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;
const searchButton = document.querySelector(".btn");
let searchBarText = document.getElementById("searchbar");
let weatherDisplay = document.querySelector(".grid-container");
let cityList = document.querySelector(".cityList");
let cities = [];


//the date
function displayDate(day) {
    var todayDate = dayjs().format('M/DD/YYYY');
    return todayDate;
  }

//When clicked, the content entered in the searchbar saves to localstorage and creates new button.


searchButton.onclick = function(){
  fetchData(searchBarText.value);
  storeCities(searchBarText.value);
  pastSearch(searchBarText.value);
  weatherDisplay.innerHTML = "";

};


/* $(".btn").click(function(){
    let searchBarText = $("#searchbar").val();
    storeCities(searchBarText);
    let weather = fetchData(searchBarText);
    newButton(searchBarText);
    weatherDisplay.innerHTML = "";
    
}); */
// stores searched city to local storage 
function storeCities() {
  cities.push(searchBarText.value);
  localStorage.setItem("Previous City", JSON.stringify(cities));
}
// creates a new button
   const pastSearch = () => {
    const newButton = document.createElement("button");
    newButton.classList = "btn btn-primary"
    newButton.textContent = searchBarText.value;
    cityList.appendChild(newButton);
    newButton.addEventListener("click", fetchData); 
};
 
//this function gets weather data from the city searched in the searchBarText
function fetchData(searchBarText){
    
    const dataFetch = `https://api.openweathermap.org/data/2.5/weather?q=${searchBarText}&appid=${apiKey}`
    let results = 
    fetch(dataFetch)
    .then(response => response.json())
    .then(data => {
         let lat = data.coord.lat
         let lon = data.coord.lon
        let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        
        let fetchAgain = fetch(requestUrl)
        .then(response => response.json())
        .then(data => {
            currentConditions(data);
            fiveDay(data);
           return data;
        });
        return fetchAgain;
    });
    return results;
    
}
// current weather div display
  function currentConditions(citydata){
    let day = dayjs().format('M/DD/YYYY');
    let todaysDate = "Right now"
    let todayDiv = document.createElement("div");
    let currentHeader = document.createElement("h2");
    let listConditions = document.createElement("ul");
    let temp = document.createElement("li");
    let humidity = document.createElement("li");
    let windSpeed = document.createElement("li");
    let weatherIconImg = document.createElement('img');
    let iconURL = "http://openweathermap.org/img/w/" + citydata.list[0].weather[0].icon + ".png";

    weatherIconImg.setAttribute("src", iconURL);
    weatherIconImg.setAttribute("id", "IconImg");
    todayDiv.className = "item";
    todayDiv.id = "currentWeather";

    todayDiv.appendChild(currentHeader);
    todayDiv.appendChild(listConditions);
    todayDiv.appendChild(temp);
    todayDiv.appendChild(humidity);
    todayDiv.appendChild(windSpeed);
    todayDiv.appendChild(weatherIconImg);
    weatherDisplay.appendChild(todayDiv);

    currentHeader.textContent = todaysDate;
    temp.textContent = " Temp: " + citydata.list[0].main.temp + " ℉";
    humidity.textContent = " Humidty: " + citydata.list[0].main.humidity;
    windSpeed.textContent = " Wind speed: " + citydata.list[0].wind.speed;

    console.log(citydata);
/*    console.log("Current temperature: " + citydata.list[0].main.temp);
   console.log("Humidty: " + citydata.list[0].main.humidity);
   console.log("Wind speed: " + citydata.list[0].wind.speed); 
    console.log(iconURL); */
  };


 //Gets the five day forecast and adds it to the page 
  function fiveDay(citydata){
    const futureCast = citydata.list;
    for(let i = 0; i < futureCast.length; i+=8){
      const forecastDivs = document.createElement('div');
        forecastDivs.classList = "item Day";
        let day = dayjs(futureCast[i].dt_txt).format('M/DD/YYYY');
      let weatherIcon = futureCast[i].weather[0].icon;

      forecastDivs.innerHTML = `<h2>${day}</h2>
      <ul>
      <li>Temp: ${futureCast[i].main.temp} ℉ </li>
      <li> Humidity: ${futureCast[i].main.humidity}</li>
      <li> Wind Speed: ${futureCast[i].wind.speed}</li>
      <img src= http://openweathermap.org/img/w/${weatherIcon}.png>
      </ul>`
      weatherDisplay.appendChild(forecastDivs);

    };
  };


 function init() {
  const savedCities = JSON.parse(localStorage.getItem("Previous City"));
  if(savedCities !== null){
    cities = savedCities;
  };
  pastSearch();
};

init(); 
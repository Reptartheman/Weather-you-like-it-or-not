const apiKey = "8160474e6f23dd64a3ea9a9e05d2989d";
let requestUrl = `api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=${apiKey}`;

const searchButton = document.querySelector(".btn");
const currentWeather = document.getElementById("currentWeather");


//When clicked, the content entered in the searchbar saves to localstorage.
$(".btn").click(function(){
    let searchBarText = $("#searchbar").val();
    localStorage.setItem("searchBarText",searchBarText);

    let weather = fetchData(searchBarText);

   // currentConditions(weather);
/*     const dataFetch = `https://api.openweathermap.org/data/2.5/weather?q=${searchBarText}&appid=${apiKey}`
    fetch(dataFetch)
    .then(response => response.json())
    .then(data => console.log(data)) */
});

function fetchData(searchBarText){
    const dataFetch = `https://api.openweathermap.org/data/2.5/weather?q=${searchBarText}&appid=${apiKey}`
    fetch(dataFetch)
    .then(response => response.json())
    .then(data => {
        //console.log(data);
         let lat = data.coord.lat
         let lon = data.coord.lon
        let requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
        
        fetch(requestUrl)
        .then(response => response.json())
        .then(data => currentConditions(data));
    });
}


 function currentConditions(citydata){
    currentCard = document.createElement("div");
    currentCard.classList.add("card");
    currentCard.innerHTML = `<div class="card-header"> ${citydata.city.name} </div>
    <div class="card-body"> 
    <h5> ${citydata.list[0].weather[2]}</h5>  
    <h5> Temperature: ${citydata.list[0].main.temp}</h5>
    <h5> Wind: ${citydata.list[0].wind.speed}</h5> <h5> Humidity: ${citydata.list[0].main.humidity}</h5>
    <h3> 5-Day Forecast: </h3> <h5> Temperature: ${citydata.list[8].main.temp}</h5> 
    
    
    
    </div>`

    currentWeather.appendChild(currentCard);

    
    for(let i = 0; i < citydata.list.length; i+=8){
        console.log(citydata.list[i]);
    }
    // console.log(citydata);
   // currentWeather.textContent = 
}




//You had .text instead of .val(). Parenthesis were needed. 
//.setItem needs a key and a value. You did not need to have JSON.stringify


// Grab the current data from the first API call on line 23 and then grab the 5 day forecast from the second API call. Hard code it to be 5 iterations, see line 43




/* GIVEN a weather dashboard with form inputs

WHEN I search for a city 
THEN I am presented with current and future conditions for that city and that city is added to the search history

WHEN I view current weather conditions for that city
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, and the wind speed

WHEN I view future weather conditions for that city
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

WHEN I click on a city in the search history
THEN I am again presented with current and future conditions for that city */

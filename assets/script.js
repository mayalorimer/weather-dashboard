var cityContent = document.getElementById('city'); 
var submitBtn = document.getElementById('submit');
var lat;
var long; 
var city;
var weather;
var searchHistory = []; 

//variables for displaying weather
var date;
var weatherIcon;
var Ktemp;
var temp; 
var humidity;
var windSpeed;
var UVindex; 



// on submit for the city
submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    city = cityContent.value; 
    searchHistory.push(city); 
    latLong();
})


//var apiWeatherKey = c99c17905b00b5b873d957ca08c3669d;

var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=` + city + `&limit=5&appid=c99c17905b00b5b873d957ca08c3669d`;

//returns latitude and longitude
function latLong(){
    fetch(geocodeUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            lat = data[0].lat;
            long = data[0].lon;
            console.log(lat);
            console.log(long); 
            weatherApi(); 
        })
}

var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=c99c17905b00b5b873d957ca08c3669d';
var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid={API key}'
/*
//current weather API cal 
function currentWeather(){
    fetch(currentUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            console.log(data);
            Ktemp = data.main.temp; 
            temp = Math.floor((Ktemp - 273)*(9/5) + 32);
            humidity = data.main.humidity;
            windSpeed = data.wind.windspeed; 
            weatherIcon = data.weather.icon;
            displayCurrentWeather(); 
        })
}
*/

// references for current weather in html
var currentTempEl = document.querySelector('.currentTemp');
var currenthumidEl = document.querySelector('.currentHumid');
var currentWindEl = document.querySelector('.currentWind');
var currentUVEl = document.querySelector('.currentUV');
var currentIcon = document.querySelector('.icon');
var currentDate = document.querySelector('.date');
//function to display the current weather
function displayCurrentWeather(){
    currentDate.textContent = moment().format("MM-DD-YY");
    currentTempEl.textContent = temp;
    currenthumidEl.textContent = humidity; 
    currentWindEl.textContent = windSpeed; 
    currentUVEl.textContent = UVindex;
    currentIcon.setAttribute("src", weatherIcon);
}
displayCurrentWeather();
/*
 //returns weather for the 5 day forecast
 function weatherApi(){
     fetch(weatherUrl)
         .then(function(response){
             return response.json();
         })
         .then(function (data) {
             console.log(data);
             Ktemp = data.list[1].main.temp; 
             temp = Math.floor((Ktemp - 273)*(9/5) + 32); 
             weather = data.list[1].weather[0].main;
             console.log(temp);
             console.log(weather);
         })
 }

*/
var cityContent = document.getElementById('city'); 
var submitBtn = document.getElementById('submit');
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
var newCity; 
var lat;
var long;

var currentTitle = document.querySelector('.current-city'); 
var current = document.querySelector('.weather');
var iconEl = document.querySelector('.icon');


// on submit for the city
submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    currentTitle.style.display = "block"; 
    current.style.display = "block";
    iconEl.style.display = "block";
    city = cityContent.value; 
    searchHistory.push(city); 
    latLong(city);
    storage(); 
})


//var apiWeatherKey = c99c17905b00b5b873d957ca08c3669d;



//returns latitude and longitude
function latLong(city){
    var geocodeUrl = `https://api.openweathermap.org/geo/1.0/direct?q=` + city + `&limit=5&appid=c99c17905b00b5b873d957ca08c3669d`;
    fetch(geocodeUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            lat = data[0].lat;
            long = data[0].lon; 
            console.log(city); 
            currentWeather(city);
            weatherApi(); 
        })
}


//current weather API cal 
function currentWeather(city){
    var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=c99c17905b00b5b873d957ca08c3669d';
    fetch(currentUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data){
            Ktemp = data.main.temp; 
            temp = Math.floor((Ktemp - 273)*(9/5) + 32);
            humidity = data.main.humidity;
            windSpeed = data.wind.speed; 
            weatherIcon = data.weather[0].icon;
            newCity = city; 
            UVApi(); 
        })
}

// API call for UV index
function UVApi(){
    var UVUrl = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&appid=c99c17905b00b5b873d957ca08c3669d';
    fetch(UVUrl)
        .then(function (response){
            return response.json();
        })
        .then(function(data){
            UVindex = data.current.uvi; 
            displayCurrentWeather();
        })
}


// references for current weather in html
var currentTempEl = document.querySelector('.currentTemp');
var currenthumidEl = document.querySelector('.currentHumid');
var currentWindEl = document.querySelector('.currentWind');
var currentUVEl = document.querySelector('.currentUV');
var currentIcon = document.querySelector('.icon');
var currentDate = document.querySelector('.date');
//function to display the current weather
function displayCurrentWeather(){
    //decides the color for the UV index
    var color; 
    if (UVindex <= 2) {
        color = '#00FF00';
    }
    else if (UVindex > 2 && UVindex <= 5) {
        color = '#FFFF00'; 
    }
    else {
        color = "#FF0000"; 
    }

    currentDate.textContent = newCity + ", " + moment().format("MM-DD-YY");
    currentTempEl.textContent = "Temperature: " + temp;
    currenthumidEl.textContent = "Humidity: " + humidity; 
    currentWindEl.textContent = "Wind speed: " + windSpeed + ' mph'; 
    currentUVEl.textContent = "UV Index: " + UVindex;
    currentUVEl.setAttribute('style', "background-color: " + color); 
    var imgUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
    currentIcon.setAttribute("src", imgUrl);

}


 //returns weather for the 5 day forecast
 function weatherApi(){
    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=c99c17905b00b5b873d957ca08c3669d';
     fetch(weatherUrl)
         .then(function(response){
             return response.json();
         })
         .then(function (data) {
            for (var i = 0; i < 5; i++){
                Ktemp = data.list[i].main.temp; 
                temp = Math.floor((Ktemp - 273)*(9/5) + 32); 
                var newDate = moment().add(i + 1, 'days');
                date = newDate.format("MM-DD-YY");
                weatherIcon = data.list[i].weather[0].icon;
                windSpeed = data.list[i].wind.speed;
                humidity = data.list[i].main.humidity;
                display5day(date, weatherIcon, temp, windSpeed, humidity);
             }
           
         });
 }


 var newDiv = document.createElement('div');
 newDiv.setAttribute("style", "border-style: solid");
 newDiv.setAttribute("class", "weather-display");
// do this for each of the five days in the upcoming forecast
function display5day(date, weatherIcon, temp, windSpeed, humidity){
    // adding the date
    var new1 = document.createElement('p'); 
    var date1 = document.createTextNode(date); 
    new1.appendChild(date1);
    newDiv.appendChild(new1);
    document.body.appendChild(newDiv); 

    // adding the weather icon
    var new2 = document.createElement('img'); 
    var imgUrl = "https://openweathermap.org/img/w/" + weatherIcon + ".png";
    new2.setAttribute("alt", "Weather icon"); 
    new2.setAttribute("src", imgUrl);
    newDiv.appendChild(new2);
    document.body.appendChild(newDiv); 

    // adding the temp
    var new3 = document.createElement('p'); 
    var date3 = document.createTextNode("Temperature: " + temp); 
    new3.appendChild(date3);
    newDiv.appendChild(new3);
    document.body.appendChild(newDiv); 

    // adding the wind
    var new4 = document.createElement('p'); 
    var date4 = document.createTextNode("Wind Speed: " + windSpeed + " mph"); 
    new4.appendChild(date4);
    newDiv.appendChild(new4);
    document.body.appendChild(newDiv); 

    // adding the humidity
    var new4 = document.createElement('p'); 
    var date4 = document.createTextNode("Humidity: " + humidity + "%"); 
    new4.appendChild(date4);
    newDiv.appendChild(new4);
    document.body.appendChild(newDiv); 
  
}
 
var cityArr = []; 

function storage(){
    //checks for a stored list
    var storedCities = JSON.parse(localStorage.getItem('cityArr'));
    if (storedCities === null){
        cityArr.push(city); 
    }
    else {
        cityArr = storedCities; 
        cityArr.push(city); 
    }


//add the city to local storage
localStorage.setItem('cityArr', JSON.stringify(cityArr));
displayStorage(); 
}

var historyList = document.querySelector('.history-list'); 

//function to display the storage
function displayStorage(){
    var storedCities = JSON.parse(localStorage.getItem('cityArr'));
    if (storedCities !== null){
        for (var i = 0; i < storedCities.length; i ++){
            console.log(storedCities[i]);
            
            historyList.innerHTML += '<li>' + storedCities[i] + '</li>';
        }
    }

}


historyList.addEventListener('click', function(event){
    var selectedCity = event.target.textContent;
    city = selectedCity;  
    var weatherDisplay = document.querySelector('.weather-display'); 
    weatherDisplay.innerHTML = ""; 
    latLong(selectedCity); 
})

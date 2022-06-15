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

var currentTitle = document.querySelector('.current-city'); 
var current = document.querySelector('.weather');


// on submit for the city
submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    currentTitle.style.display = "block"; 
    current.style.display = "block";
    city = cityContent.value; 
    searchHistory.push(city); 
    latLong();
})


//var apiWeatherKey = c99c17905b00b5b873d957ca08c3669d;



//returns latitude and longitude
function latLong(){
    var geocodeUrl = `http://api.openweathermap.org/geo/1.0/direct?q=` + city + `&limit=5&appid=c99c17905b00b5b873d957ca08c3669d`;
    fetch(geocodeUrl)
        .then(function(response){
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            lat = data[0].lat;
            long = data[0].lon; 
            currentWeather();
            weatherApi(); 
        })
}


//current weather API cal 
function currentWeather(){
    var currentUrl = 'https://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + long + '&appid=c99c17905b00b5b873d957ca08c3669d';
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
            console.log("check");
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
    currentDate.textContent = moment().format("MM-DD-YY");
    currentTempEl.textContent = "Temperature: " + temp;
    currenthumidEl.textContent = "Humidity: " + humidity; 
    currentWindEl.textContent = "Wind speed: " + windSpeed + ' mph'; 
    currentUVEl.textContent = "UV Index: " + UVindex;
    var imgUrl = "http://openweathermap.org/img/wn/" + weatherIcon + ".png";
    currentIcon.setAttribute("src", imgUrl);
}


 //returns weather for the 5 day forecast
 function weatherApi(){
    var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + lat + '&lon=' + long + '&appid=c99c17905b00b5b873d957ca08c3669d';
     fetch(weatherUrl)
         .then(function(response){
             return response.json();
         })
         .then(function (data) {
             console.log(data);
             for (var i = 0; i < data.length; i++){
                Ktemp = data.list[i].main.temp; 
                temp = Math.floor((Ktemp - 273)*(9/5) + 32); 
                var newDate = moment().add(i + 1, 'days');
                date = newDate.format("MM-DD-YY");
                weatherIcon = data.list[i].weather.icon;
                windSpeed = data.list[i].wind.speed;
                humidity = data.list[i].main.humidity;
                display5day(date, weatherIcon, temp, windSpeed, humidity);
             }
           
         })
 }



// do this for each of the five days in the upcoming forecast
function display5day(date, weatherIcon, temp, windSpeed, humidity){
    var newDiv = document.createElement('div');
    // adding the date
    var new1 = document.createElement('p'); 
    var date1 = document.createTextNode(date); 
    new1.appendChild(date1);
    newDiv.appendChild(new1);
    document.body.appendChild(newDiv); 

    // adding the weather icon
    var new2 = document.createElement('p'); 
    var date2 = document.createTextNode(weatherIcon); 
    new2.appendChild(date2);
    newDiv.appendChild(new2);
    document.body.appendChild(newDiv); 

    // adding the temp
    var new3 = document.createElement('p'); 
    var date3 = document.createTextNode(temp); 
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
    var date4 = document.createTextNode(humidity); 
    new4.appendChild(date4);
    newDiv.appendChild(new4);
    document.body.appendChild(newDiv); 
  
}
 
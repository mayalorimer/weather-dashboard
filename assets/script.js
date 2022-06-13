var city = document.getElementById('city'); 
var Ktemp;
var temp; 
var weather;

var city = "Los Angeles"; 

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
        })
}

latLong();
// var weatherUrl = 'http://api.openweathermap.org/data/2.5/forecast?lat=' + latitude + '&lon=' + longitude + '&appid=c99c17905b00b5b873d957ca08c3669d';


// //returns weather for the 5 day forecase
// function weatherApi(){
//     fetch(weatherUrl)
//         .then(function(response){
//             return response.json();
//         })
//         .then(function (data) {
//             console.log(data);
//             Ktemp = data.list[1].main.temp; 
//             temp = Math.floor((Ktemp - 273)*(9/5) + 32); 
//             weather = data.list[1].weather[0].main;
//             console.log(temp);
//             console.log(weather);
//         })
// }

// weatherApi();


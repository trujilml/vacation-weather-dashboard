//below sets date and current time for user on header - used moment.js
var todayEl = document.querySelector("#today"); 
var todayTime = moment();

todayEl.textContent = todayTime.format("dddd, MMMM Do YYYY, h:mm:ss a");

function retrieve() {

    var weatherToday = document.getElementById("#weathernow");
    var city = document.getElementById("#city");
    var cityName = document.getElementById("#city-name");
    var weatherPicture = document.getElementById("#image");
    var temperatureNow = document.getElementById("#temperature");
    var humidityNow = document.getElementById("#humidity");
    var windSpeed = document.getElementById("#wind-speed"); 
    var currentUvIndex = document.getElementById("#UV-index");



//const APIKey = "";




//API key will be implemented when project is nearly done - in order to not get github guardian alerts on my phone multiple times per day
//wait till next week to turn in - for now, let's work on

function weather(city) {

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    axios.get(url).then (function(response) {
        console.log(response);

        weatherToday.classList.remove("d-none");

        var todayDate = new Date(reponse.data.dt * 1000);
        var day = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var year = todayDate.getFullYear();
        cityName.innerHTML = response.data.name + "(" + month + "/" + day + "/" + year + ")";

        let picOfWeather = response.data.weather[0].icon;
        weatherPicture.setAttribute("src", "https://openweathermap.org/img/wn/" + picOfWeather + "@2x.png");
        weatherPicture.setAttribute("alt", response.data.weather[0].description);

        temperatureNow.innerHTML = "Temperature:" + k2f(response.data.main.temp) + "&#176";
        humidityNow.innerHTML = "Humidity:" + response.data.main.humidity + "%";
        windSpeed.innerHTML = "Wind Speed:" + response.data.wind.speed + "MPH";

        //uv index
        let latitude = response.data.coord.lat;
        let longitude = response.data.coord.lon;




    })
}
}
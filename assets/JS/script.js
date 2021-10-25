//below sets date and current time for user on header - used moment.js
// var todayEl = document.querySelector("#today"); 
// var todayTime = moment();

// todayEl.textContent = todayTime.format("dddd, MMMM Do YYYY, h:mm:ss a");

function retrieveThis() {

    var weatherToday = document.getElementById("#weathernow");
    var city = document.getElementById("#city");
    var cityName = document.getElementById("#city-name");
    var weatherPicture = document.getElementById("#image");
    var temperatureNow = document.getElementById("#temperature");
    var humidityNow = document.getElementById("#humidity");
    var windSpeed = document.getElementById("#wind-speed"); 
    var currentUvIndex = document.getElementById("#UV-index");

    var searchIt = document.getElementById("#search-btn");
    var searchHistory = document.getElementById("#history");
    var clearIt = document.getElementById("#clear-search");

    var fiveDayForecast = document.getElementById("#fivedayboard");

    let searchLog = JSON.parse(localStorage.getItem("search")) || [];


    // const apiKey = "";
    

//API key will be implemented when project is nearly done - in order to not get github guardian alerts on my phone multiple times per day
//wait till next week to turn in - for now, let's work on

function weatherRetrieval(city) {

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey;

    axios.get(url).then (function(response) {
        console.log(response);

        weatherToday.classList.remove("d-none");

        var todayDate = new Date(response.data.dt * 1000);
        var day = todayDate.getDate();
        var month = todayDate.getMonth() + 1;
        var year = todayDate.getFullYear();
        cityName.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";

        let picOfWeather = response.data.weather[0].icon;
        weatherPicture.setAttribute("src", "https://openweathermap.org/img/wn/" + picOfWeather + "@2x.png");
        weatherPicture.setAttribute("alt", response.data.weather[0].description);

        temperatureNow.innerHTML = "Temperature:" + k2f(response.data.main.temp) + "&#176";
        humidityNow.innerHTML = "Humidity:" + response.data.main.humidity + "%";
        windSpeed.innerHTML = "Wind Speed:" + response.data.wind.speed + "MPH";

        //uv index
        let latitude = response.data.coord.lat;
        let longitude = response.data.coord.lon;

        let uvIndexUrl = "https://api.openweathermap.org/data/2.5/weather?lat=" + latitude + "&lon=" + longitude + "&appid=" + apiKey + "&cnt=1";

        axios.get(uvIndexUrl).then (function(response) {
            let uV = document.createElement("span");

            if (response.data[0].value < 4) {
                uV.setAttribute("class", "badge badge-success");
            }
            else if (response.data[0].value < 8) {
                uV.setAttribute("class", "badge badge-warning");
            }
            else {
                uV.setAttribute("class", "badge badge-danger");
            }
        console.log(response.data[0].value);
        currentUvIndex.innerHtml = response.data[0].value;
        currentUvIndex.innerHtml = "UV Index: ";
        currentUvIndex.append(uV);
    });

    let cityInfo = response.data.id;
    let dailyForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityInfo + "&appid=" + apiKey;
    axios.get(dailyForecastUrl)
    .then(function (response) {
        fiveDayForecast.classList.remove("d-none");

        const forecastLong = document.querySelectorAll(".forecast");
        for (i = 0; i < forecastLong.length; i++) {
            forecastLong[i].innerHTML = "";
            var forecastIndex = i * 8 + 4;
            var forecastDate = new Data (response.data.list[forecastIndex].dt * 1000);
            var forecastDay = forecastDate.getDate();
            var forecastMonth = forecastDate.getMonth() + 1;
            var forecastYear = forecaseDate.getFullYear();
            var currentForecastDate = document.createElement("p");
            currentForecastDate.setAttribute("class","mt-3 mb-0 current-forecast-date");
            currentForecastDate.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
            forecastLong[i].append(currentForecastDate);

            //icons representing current weather
            var forecastWeatherImage = document.createElement("img");
            forecastWeatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
            forecastWeatherImage.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
            forecastLong[i].append(forecastWeatherImage);

            var forecastTemperature = document.createElement("p");
            forecastTemperature.innerHTML = "Temperature: " + k2f(response.data.list[forecastIndex].main.temp) + "&#176";
            forecastLong[i].append(forecastTemperature);

            var forecastHumidity = document.createElement("p");
            forecastHumidity.innerHTML = "Humidity: " + (response.data.list[forecastIndex].main.humidity) + "%";
            forecastLong[i].append(forecastHumidity);
        }
    })
});
}


searchIt.addEventListener("click", function() {
    const searchCity = city.value;
    weatherRetrieval(searchCity);
    searchLog.push(searchCity);
    localStorage.setItem("search", JSON.stringify(searchLog));
    retrieveSearchLog();
})

clearIt.addEventListener("click", function() {
    localStorage.clear();
    searchLog = [];
    retrieveSearchLog();
})

function k2f(K) {
    return Math.floor((K - 273.15) * 1.8 + 32);
}

function retrieveSearchLog() {
 searchHistory.innerHTML = "";
 for (let i = 0; i < searchHistory.length; i++) {
     const pastSearchItem = document.createElement("input");
     pastSearchItem.searchAttribute("type","text");
     pastSearchItem.searchAttribute("readonly", true);
     pastSearchItem.searchAttribute("class", "form-control d-block bg-white");
     pastSearchItem.searchAttribute("value", searchLog[i]);
     pastSearchItem.addEventListener("click", function(){
         weatherRetrieval(pastSearchItem.value);
     })
     searchHistory.append(pastSearchItem);
    }
}

retrieveSearchLog();

if (searchLog.length > 0) {
    weatherRetrieval(searchLog[searchLog.length - 1]);
}
}

retrieveThis();
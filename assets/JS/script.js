//below sets date and current time for user on header - used moment.js
var todayEl = document.querySelector("#today"); 
var todayTime = moment();

todayEl.textContent = todayTime.format("dddd, MMMM Do YYYY, h:mm:ss a");


var searchIt = $(".search-btn");

var apiKey = "";
// //API key will be implemented when project is nearly done - in order to not get github guardian alerts on my phone multiple times per day
// //wait till next week to turn in - for now, let's work on

for (let i = 0; i < localStorage.length; i++) {
    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

var cityCountTotal = 0;

var searchForm = $(".search-form").val;

let searchedForecastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchForm + "&appid=" + apiKey;

let dailyForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchForm + "&appid=" + apiKey;



if (searchForm == "") {
    console.log(searchForm);
} $.ajax({
    url: searchedForecastUrl,
    method: "GET"
}).then (function (response) {
    var cityName = $(".list-group").addClass("list-group-item");
    cityName.append("<li>" + response.name + "</li>");

    var localSearch = localStorage.setItem(cityCountTotal, response.name);
    cityCountTotal = cityCountTotal + 1;

    var currentWeatherDisplay = $(".weather-card").append("<div>").addClass("card-holder");
    currentWeatherDisplay.empty();
    var currentWeatherNow = currentWeatherDisplay.append("<p>");
    currentWeatherDisplay.append(currentWeatherNow);


    var todayDate = new Date(response.dt * 1000);
    currentWeatherNow.append(response.name + " " + todayDate.toLocaleDateString("en-US"));
    currentWeatherNow.append('<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">');

    var currentTemperature = currentWeatherNow.append("<p>");
    currentWeatherNow.append(currentTemperature);
    currentTemperature.append("<p>" + "Temperature: " + response.main.temp + "&#176" + "</p>");
    currentTemperature.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
    currentTemperature.append("<p>" + "Wind Speed: " + response.wind.speed + "MPH" + "</p>");


    var uvIndexUrl = "https://api.openweathermap.org/data/2.5/uvi?appid=" + apiKey + "${response.coord.lat}" + "&lon="+ "${response.coord.lon}" + "&cnt=1";

    $.ajax({
        url: uvIndexUrl,
        method: "GET"
    }).then (function(response) {
        var currentUVIndex = currentTemperature.append("<p>" + "UV Index: " + response.value + "</p>");

          if (response.value < 4) {
            currentUVIndex.setAttribute("class", "badge badge-success");
            }
          else if (response.value < 8) {
               currentUVIndex.setAttribute("class", "badge badge-warning");
            }
            else {
                currentUVIndex.setAttribute("class", "badge badge-danger");
            }

            currentUVIndex.addClass("UV");
            currentTemperature.append(currentUVIndex);
    });


});




ajax.get(dailyForecastUrl)
    .then(function (response) {
        console.log(response);
    })

var clearIt = $(".clear-btn");

localStorage.localSearch.clear();






















//    
//     axios.get(dailyForecastUrl)
//     .then(function (response) {
//         fiveDayForecast.classList.remove("d-none");

//         const forecastLong = document.querySelectorAll(".forecast");
//         for (i = 0; i < forecastLong.length; i++) {
//             forecastLong[i].innerHTML = "";
//             var forecastIndex = i * 8 + 4;
//             var forecastDate = new Data (response.data.list[forecastIndex].dt * 1000);
//             var forecastDay = forecastDate.getDate();
//             var forecastMonth = forecastDate.getMonth() + 1;
//             var forecastYear = forecaseDate.getFullYear();
//             var currentForecastDate = document.createElement("p");
//             currentForecastDate.setAttribute("class","mt-3 mb-0 current-forecast-date");
//             currentForecastDate.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
//             forecastLong[i].append(currentForecastDate);

//             //icons representing current weather
//             var forecastWeatherImage = document.createElement("img");
//             forecastWeatherImage.setAttribute("src", "https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
//             forecastWeatherImage.setAttribute("alt", response.data.list[forecastIndex].weather[0].description);
//             forecastLong[i].append(forecastWeatherImage);

//             var forecastTemperature = document.createElement("p");
//             forecastTemperature.innerHTML = "Temperature: " + k2f(response.data.list[forecastIndex].main.temp) + "&#176";
//             forecastLong[i].append(forecastTemperature);

//             var forecastHumidity = document.createElement("p");
//             forecastHumidity.innerHTML = "Humidity: " + (response.data.list[forecastIndex].main.humidity) + "%";
//             forecastLong[i].append(forecastHumidity);
//         }
//     })
// });
// }





// function retrieveSearchLog() {
//  searchHistory.innerHTML = "";
//  for (let i = 0; i < searchHistory.length; i++) {
//      const pastSearchItem = document.createElement("input");
//      pastSearchItem.searchAttribute("type","text");
//      pastSearchItem.searchAttribute("readonly", true);
//      pastSearchItem.searchAttribute("class", "form-control d-block bg-white");
//      pastSearchItem.searchAttribute("value", searchLog[i]);
//      pastSearchItem.addEventListener("click", function(){
//          weatherRetrieval(pastSearchItem.value);
//      })
//      searchHistory.append(pastSearchItem);
//     }
// }

// retrieveSearchLog();


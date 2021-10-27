//below sets date and current time for user on header - used moment.js
var todayEl = document.querySelector("#today"); 
var todayTime = moment();

todayEl.textContent = todayTime.format("dddd, MMMM Do YYYY, h:mm:ss a");


var searchIt = $(".search-btn");


var apiKey = "";
// //API key will be implemented when project is nearly done - in order to not get github guardian alerts on my phone multiple times per day
// //wait till sunday to turn in - for now, let's work on the project and finish it up

for (var i = 0; i < localStorage.length; i++) {

    var city = localStorage.getItem(i);
    var cityName = $(".list-group").addClass("list-group-item");

    cityName.append("<li>" + city + "</li>");
}

var cityCountTotal = 0;

searchIt.click(function () {

    var searchForm = $(".search-form").val();

    var searchedForecastUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchForm + "&appid=" + apiKey + "&units=imperial";

    var dailyForecastUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + searchForm + "&appid=" + apiKey + "&units=imperial";



if (searchForm == "") {
    console.log(searchForm);
} $.ajax({
    url: searchedForecastUrl,
    method: "GET"
}).then(function (response) {
    var cityName = $(".list-group").addClass("list-group-item").removeClass("d-none");
    cityName.append("<li>" + response.name + "</li>");

    var local = localStorage.setItem(cityCountTotal, response.name);
    cityCountTotal += 1;

    var currentWeatherDisplay = $(".weather-card").append("<div>").addClass("card-holder");
    currentWeatherDisplay.empty();
    var currentWeatherNow = currentWeatherDisplay.append("<h2>" + response.name + "</h2>");
    currentWeatherDisplay.append(currentWeatherNow);



    var todayDate = new Date(response.dt * 1000);
    currentWeatherNow.append(" " + todayDate.toLocaleDateString("en-US"));
    currentWeatherNow.append(`<img src="https://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png">`);

    var currentTemperature = currentWeatherNow.append("<p>");

    currentWeatherNow.append(currentTemperature);
    currentTemperature.append("<p>" + "Temperature: " + response.main.temp + "\u2109" + "</p>");
    currentTemperature.append("<p>" + "Humidity: " + response.main.humidity + "%" + "</p>");
    currentTemperature.append("<p>" + "Wind Speed: " + response.wind.speed + "MPH" + "</p>");


   var uvIndexUrl  = `https://api.openweathermap.org/data/2.5/uvi?appid=` + apiKey + `&lat=${response.coord.lat}` + `&lon=${response.coord.lon}`;
 

    $.ajax({
        url: uvIndexUrl,
        method: "GET"
    }).then (function(response) {
        var currentUVIndex = currentTemperature.append("<p>" + "UV Index: " + response.value + "</p>");
        currentUVIndex.addClass("UV");
        currentTemperature.append(currentUVIndex);

          if (response.value < 4) {
            currentUVIndex.setAttribute("<p>", "badge badge-success", "</p>");
            }
          else if (response.value < 8) {
            currentUVIndex.setAttribute("<p>", "badge badge-warning", "</p>");
            }
            else {
            currentUVIndex.setAttribute("<p>", "badge badge-danger", "</p>");
            }

    });


});

$.ajax({
    url: dailyForecastUrl,
    method: "GET"
}).then(function (response) {
        
        var days = [0, 8, 16, 24, 32];
        var fiveDayForecast = $(".fivedayforecast").addClass("card-body");
        var fiveDayInfo = $(".fiveday-oneday").addClass("card-text");
        fiveDayInfo.empty();

        days.forEach(function (i) {
            var fiveDayDate = new Date(response.list[i].dt * 1000);
            fiveDayDate = fiveDayDate.toLocaleDateString("en-US");

        fiveDayInfo.append("<div class= fiveDayCurrent>" + "<h2>" + fiveDayDate + "</h2>" + 
        `<img src="https://openweathermap.org/img/wn/${response.list[i].weather[0].icon}@2x.png">` + "<p>" + "Temperature: " +
        response.list[i].main.temp + "\u2109" + "</p>" + "<p>" + "Wind Speed: " + response.list[i].wind.speed + "MPH" + "</p>" + 
        "<p>" + "Humidity: " + response.list[i].main.humidity + "%" + "</p>" + "</div>");

        })
    });
})



//clear button 
$(".clear-btn").on("click"), function() {
 localStorage.setItem(cityCountTotal, "");
 localStorage.setItem(response.name, "");

 local.clear(cityCountTotal, response.name); 
}

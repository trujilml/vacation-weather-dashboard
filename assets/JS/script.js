//below sets date and current time for user on header - used moment.js
var todayEl = document.querySelector("#today"); 
var todayTime = moment();

todayEl.textContent = todayTime.format("dddd, MMMM Do YYYY, h:mm:ss a");

// const APIKey = "9ec33c9f56aaa842560b13552e741183";
var city = document.querySelector("#city");


function weather(city) {

    let url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + APIKey;

    axios.get(url).then (function(response) {
        console.log(response);




    })
}
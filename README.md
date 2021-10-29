# Vacation! A Weather Dashboard
## Application Purpose

## user story
AS A traveler 
I WANT to see the weather outlook for multiple cities 
SO THAT I can plan a trip accordingly 

## acceptance criteria
GIVEN a weather dashboard with form inputs 
WHEN I search for a city 
THEN I am presented with current and future conditions for that city and that city is added to the search history 
WHEN I view current weather conditions for that city 
THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index 
WHEN I view the UV index 
THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe 
WHEN I view future weather conditions for that city -
THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity 


## Application develop with 
* HTML
* JavaScript 
* CSS 
* Bootstrap - implements the responsive web design of this weather application. Desktop friendly and mobile friendly. 
* jQuery - used to call the functions with the use of JSON terms and assets of the OpenWeather One Call API url. 
* Moment.js - implements visible current time format on the header.
* OpenWeather One Call API - used to collect weather data from different locations and is used alongside jQuery to create the current forecast for the city alongside several weather conditions
* Local storage is implemented for users when a city is searched and saves up however many cities are searched by the user. The search list of cities are saved and remained on the link. However, when another city is searched, it will take the place of the first city the user searched, again implementing the number of times the user searches for cities.

## Deployed Website and GitHub Repository Link
* Deployed Website - https://trujilml.github.io/vacation-weather-dashboard/
* GitHub Repository - https://github.com/trujilml/vacation-weather-dashboard 

## Further Development Notes
* Alongside the current local storage of the cities that the user searches for, there will be the future implementation of a clear search function that allows for the user to clear their current search history in favor of looking for more cities of their future travel destination. This implementation will be helpful as it will clear out the long city search list users might have when they search for more cities. 
* I found difficulty implementing in the click function of the previous searched cities on the list-group element. Future considerations will also involving figuring out how to allow a user to choose a previous city and review its current weather and future forecast. 

## Special Thanks
A special thanks to the teaching assistant Vicky for helping me out with the search list as I previously ran into issues with it, including the local storage. I greatly appreciate the help alongside adding future development notes with this project. Thank you!

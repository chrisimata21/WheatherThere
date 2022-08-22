//moment js
var timeDisplay = document.querySelector("#currentDay");
var currentTime = moment();

timeDisplay.textContent = currentTime.format("MMMM Do YYYY, h:mm a");

const apiKey = "bbefd399e3c1d1bea8905a2d056c2b8e";

// Search Items
let searchCity = $("#search-city");
let searchHistory = $("#search-history");
let searchBtn = $("#btn");

// Weather information item
let weatherInfo = $(".weather-info");
let currentDayInfo = $(".current-day-info");
let forecastInfo = $(".forecast-info");

// list of city searches
let searchCities = [];

// function to get city from search bar
let getCity = function () {
  if (!searchCity.val()) {
    window.alert("No city was entered");
    return;
  }
  let cityName = searchCity.val();
  searchCity.val("");
  getLocationInfo(cityName);
};

// function to get location informaton
let getLocationInfo = function (cityName) {
  // make api call to get longitude and latitude position of the city
  let apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    cityName +
    "&limit=1&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // match found
        if (data.length === 1) {
          addSearchHistoryItem(data[0].name);

          currentDayInfo
            .eq(0)
            .find("h2")
            .text(data[0].name + " (" + moment().format("l") + ")");
          let lat = data[0]["lat"];
          let lon = data[0]["lon"];

          // Using latitude and longitude coordinates to get weather info
          getWeatherInfo(lat, lon);
        } else {
          window.alert("Not a valid city or results not found");
        }
      });
    } else {
      window.alert("Not a valid city or results not found");
    }
  });
};

// function to add new search history item
let addSearchHistoryItem = function (cityName) {
  searchHistory.removeClass("display-off");

  // check if there already a search history with the cityname
  // if there is already one, return
  for (let i = 0; i < $(".search-history-item").length; i++) {
    if ($(".search-history-item").eq(i).text() == cityName) {
      return;
    }
  }

  // Saving search history to local Storage
  searchCities.push(cityName);
  localStorage.setItem("cities", JSON.stringify(searchCities));

  // Make search history item
  let searchHistoryItem = document.createElement("div");
  searchHistoryItem.textContent = cityName;

  // add classes to search history item
  searchHistoryItem.classList.add("search-history-item");

  // add search history item to search history
  searchHistory.append(searchHistoryItem);
};

// function to get weather information
let getWeatherInfo = function (lat, lon) {
  let apiUrl =
    "https://api.openweathermap.org/data/2.5/onecall?lat=" +
    lat +
    "&lon=" +
    lon +
    "&units=imperial" +
    "&exclude=minutely,hourly,alerts" +
    "&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // Putting in current day info

        // Weather Icon
        let currentWeatherIcon = document.createElement("img");
        currentWeatherIcon.setAttribute("alt", "Weather Icon");
        let iconcode = data.current.weather[0].icon;
        let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
        currentWeatherIcon.setAttribute("src", iconurl);
        currentDayInfo.eq(0).find("h2").append(currentWeatherIcon);

        // Temperature, Wind Speed, Humidity
        currentDayInfo
          .eq(0)
          .find(".temp")
          .text("Temp: " + data.current.temp + "°F");
        currentDayInfo
          .eq(0)
          .find(".wind")
          .text("Wind: " + data.current.wind_speed + "MPH");

        // Putting in 5 day forecast info
        for (let i = 0; i < forecastInfo.length; i++) {
          // Setting Date
          forecastInfo
            .eq(i)
            .find("h4")
            .text(
              moment()
                .add(i + 1, "days")
                .format("l")
            );

          // Weather Icon
          let iconcode = data.daily[i + 1].weather[0].icon;
          let iconurl = "https://openweathermap.org/img/w/" + iconcode + ".png";
          forecastInfo.eq(i).find(".forecast-icon").attr("src", iconurl);

          // Temperature, Wind, Humidity
          forecastInfo
            .eq(i)
            .find(".forecast-temp")
            .text("Temp: " + data.daily[i + 1].temp.max + "°F");
          forecastInfo
            .eq(i)
            .find(".forecast-wind")
            .text("Wind: " + data.daily[i + 1].wind_speed + "MPH");
        }
        weatherInfo.removeClass("display-off");
      });
    }
  });
};

searchBtn.on("click", getCity);

// Event Listener for search history items
searchHistory.on("click", ".search-history-item", function () {
  currentDayInfo
    .eq(0)
    .find("h2")
    .text($(this).text() + " (" + moment().format("l") + ")");

  // get latitude and longitude coordinates and use them to call getWeatherInfo
  let apiUrl =
    "https://api.openweathermap.org/geo/1.0/direct?q=" +
    $(this).text() +
    "&limit=1&appid=" +
    apiKey;
  fetch(apiUrl).then(function (response) {
    if (response.ok) {
      response.json().then(function (data) {
        // match found
        if (data.length === 1) {
          let lat = data[0]["lat"];
          let lon = data[0]["lon"];
          getWeatherInfo(lat, lon);
        } else {
          window.alert("Not a valid city or results not found");
        }
      });
    } else {
      window.alert("Not a valid city or results not found");
    }
  });
});

window.onload = function () {
  // Check if there are previous search cities
  searchCities = JSON.parse(localStorage.getItem("cities"));
  // If there are cities, add them to search history
  if (searchCities && searchCities.length > 0) {
    for (let i = 0; i < searchCities.length; i++) {
      addSearchHistoryItem(searchCities[i]);
    }
  } else {
    searchCities = [];
  }
};

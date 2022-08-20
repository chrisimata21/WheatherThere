function showTime() {
  var currentDate = document.getElementById("current-date");
  currentDate.textContent = moment().format('lll');
} setInterval(showTime, 1000);
let apiKey = ("ff22cce05ddb83c3402fd5ac3516da43");
// city search
let searchCity = $("#destination");
let searchBtn = $("#btn");
// weather info
let currentWeather = $("#current-weather")

// function to get city from search bar
let getCity = function() {
  if(!searchCity.val()) {
    window.alert("No city was entered");
    return;
  }
  let cityName = searchCity.val();
  searchCity.val('');
  getLocationInfo(cityName);
}

// function to get location informaton
let getLocationInfo = function(cityName) {
  // make api call to get longitude and latitude position of the city
  let apiUrl = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
  fetch(apiUrl).then(function (response) {
    if(response.ok) {
      response.json().then(function (data) {
        // match found
        if(data.length === 1) {
          addSearchHistoryItem(data[0].name);

          currentDayInfo.eq(0).find("h2").text(data[0].name + " (" + moment().format("l") + ")");
          let lat = data[0]["lat"];
          let lon = data[0]["lon"];

          // Using latitude and longitude coordinates to get weather info
          getWeatherInfo(lat,lon);
        }
        else{
          window.alert("Not a valid city or results not found");
        }
      })
    }
    else {
      window.alert("Not a valid city or results not found");
    }
  });
  console.log(cityName);
}
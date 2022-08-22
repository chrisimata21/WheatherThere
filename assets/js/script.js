function showTime() {
  var currentDate = document.getElementById("current-date");
  currentDate.textContent = moment().format('lll');
} setInterval(showTime, 1000);
// API Key
const apiKey = "10dcb4c5469e4d7db790629d9a7079a2";

let searchCity = $("#destination");
let searchBtn = $("#btn");

// Get location info
let getLocationInfo = function(cityName) {
  // api call to get lon and lat of city
  let apiUrl = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName + "&limit=1&appid=" + apiKey;
  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        // match found
        if (data.length === 1) {
          currentDayInfo.eq(0).find("h2").text(data[0].name + "(" + moment().format("l") + ")");
          let lat = data[0]["lat"];
          let lon = data[0]["lon"];
          // using lat and lon to get location for weather
          getWeatherInfo(lat, lon);
        } else {
          alert("Not a valid city or results not found");
        }
      })
    } else {
      alert("Not a valid city or results not found");
    }
  })
};
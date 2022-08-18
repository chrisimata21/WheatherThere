//Live date and time server 
function showTime() {
  var currentDate = document.getElementById("current-date");
  currentDate.textContent = moment().format('lll');
} setInterval(showTime, 1000);

// Search Items
let searchCity = $("#search-city");
let searchHistory = $("#search-history");
let searchBtn = $("#btn"); 

searchBtn.on("click", getCity);

// list of city searches
let searchCities = [];


//save it in LS
localStorage.setItem(search, history);

//Loads any data saved in local storage 
$(searchCity).val(localStorage.getItem(getLocationInfo));

// Constant URL value API
const RAPIDAPI_API_URL = 'https://google-maps28.p.rapidapi.com/maps/api/place/queryautocomplete/json';
    
// Function to get location informaton
let getLocationInfo = function(cityName) {
    // make api call to get longitude and latitude position of the city
    let apiUrl = "https://weatherapi-com.p.rapidapi.com/future.json" + cityName + "&limit=1&appid=" + apiKey;
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
}

const options = {
method: 'GET',
url: 'https://google-maps28.p.rapidapi.com/maps/api/place/queryautocomplete/json',
params: {input: 'pa', language: 'en'},
headers: {
  'X-RapidAPI-Key': '706abaea43msh336890f2b436a99p1e6e5cjsn5bbb1059416b',
  'X-RapidAPI-Host': 'google-maps28.p.rapidapi.com'
}
};

axios.request(options).then(function (response) {
console.log(response.data);
}).catch(function (error) {
console.error(error);
});


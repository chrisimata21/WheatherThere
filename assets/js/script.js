var destInput = document.querySelector('.search-btn');
var modalBg = document.querySelector('modal-bg')
var modalClose = document.querySelector('.modal-close')

destInput.addEventListener('click', function(){
  modalBg.classList.add('bg-active')
});

modalClose.addEventListener('click', function(){
  modalClose.classList.remove('bg-active')
});


function showTime() {
  var currentDate = document.getElementById("current-date");
  currentDate.textContent = moment().format('lll');
} setInterval(showTime, 1000);

//save it in LS
localStorage.setItem(search, );

//Loads any data saved in local storage 


// Implement google maps functionality
const axios = require("axios");

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
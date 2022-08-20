//Live date and time server 
function showTime() {
  var currentDate = document.getElementById("current-date");
  currentDate.textContent = moment().format('lll');
} setInterval(showTime, 1000);

// global Deferred variable
function initialize() {
  window.gmap_async = $.getScript("https://maps.googleapis.com/maps/api/js?v=3.exp&sensor=false&callback=initialize");
};

//function to load map 
function initMap() {return map;
}
function initialize(initMap) {
  var map = new google.maps.Map(document.getElementById('map'), options);
 }

// function to get location 
function codeAddress() {
  window.gmap_async.done(function () {
      new google.maps.Geocoder().geocode({
          'address': document.getElementById('address').value
      }, function (results, status) {
          if (status == google.maps.GeocoderStatus.OK) {
              alert('worked!');
          }
      });
  });
}
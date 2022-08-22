var geoContainer = document.getElementById("city");

fetch(
  "https://ipgeolocation.abstractapi.com/v1/?api_key=92d5a261cbmsh2670c43e09e3d07p15f894jsn89c9d2e082a5"
)
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);

    var cityName = document.getElementById("displayCity");

    cityName.textContent = data.city;

    restaurants(cityName.textContent);
    typing();
  });

var i = 0,
  text;
text = "Your destination awaits...";
function typing() {
  if (i < text.length) {
    document.getElementById("your-destination").innerHTML += text.charAt(i);
    i++;
    setTimeout(typing, 50);
  }
}
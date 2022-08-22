let restaurantImageDisplay1 = document.getElementById("image1");

var restaurantsDisplay = $("#restaurants");

function restaurants(cityName) {
  const encodedParams = new URLSearchParams();
  encodedParams.append("q", cityName);
  encodedParams1.append("language", "en_US");

  let cityCode = 0;
  const options = {
    method: "POST",
    headers: {
      "content-type": "application/x-www-form-urlencoded",
      "X-RapidAPI-Key": "92d5a261cbmsh2670c43e09e3d07p15f894jsn89c9d2e082a5",
      "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
    },
    body: encodedParams,
  };

  fetch("https://worldwide-restaurants.p.rapidapi.com/search", options)
    .then((response) => response.json())
    .then((results) => {
      cityCode = results.results.data[0].result_object.location_id;
      console.log(results);
      console.log(cityCode);

      const encodedParams1 = new URLSearchParams();
      encodedParams1.append("language", "en_US");
      encodedParams1.append("limit", "5");
      encodedParams1.append("location_id", cityCode);
      encodedParams1.append("currency", "USD");

      const options1 = {
        method: "POST",
        headers: {
          "content-type": "application/x-www-form-urlencoded",
          "X-RapidAPI-Host": "worldwide-restaurants.p.rapidapi.com",
          "X-RapidAPI-Key": "92d5a261cbmsh2670c43e09e3d07p15f894jsn89c9d2e082a5",
        },
        body: encodedParams1,
      };

      fetch("https://worldwide-restaurants.p.rapidapi.com/search", options1)
        .then((response) => response.json())
        .then((data) => {
          restaurantFunc(data);

          console.log(data).catch((err) => console.error(err));
        });
    });
}

var restaurantFunc = function (data) {
    for (var i = 0; i < 6; i++) {
      var restaurantName = $("<h5>").text("\n" + data.results.data[i].name).addClass("flow-text new badge blue-grey lighten-5");
      var restaurantImage = $(
        "<a href=" + data.results.data[i].website + ">" +
        "<img src=" + data.results.data[i].photo.images.small.url + ">"
      );
      var cuisine = $("<p>").text("Cuisine: " + data.results.data[i].cuisine[0].name).addClass("new badge blue-grey lighten-4");
      var restaurantCard = $("<div>");
      var price = $("<p>").text(data.results.data[i].price_level);
      var phone = $("<p>").text(data.results.data[i].phone);
      var caption = $("<p>").text("Caption: \n" + data.results.data[i].photo.caption);
      restaurantsDisplay.append(restaurantCard);
      restaurantCard.append(
        restaurantImage,
        restaurantName,
        cuisine,
        price,
        phone,
        caption
      );
    }
};
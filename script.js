var fetchWeatherButton = document.getElementById('fetch-weather-button');
var weatherDataContainer = document.getElementById('weather-data-container'); //call html ids

function clearWeatherData() {
  weatherDataContainer.textContent = ''; //set the weather data to empty
}

function fetchWeatherData(lat, lon) {
  var apiKey = 'b4d0cb90058f527cb12f84a35a04c71f';
  var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`; //leave latitude and longitude open variables for user input

  fetch(requestUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      // Clear previous data
      clearWeatherData();

      if (data.list && data.list.length > 0) { //loop through each data collected from the weather api
        // Display weather data on the page
        var weatherInfoHeader = document.createElement('p');
        weatherInfoHeader.textContent = 'Weather Data:';
        weatherDataContainer.appendChild(weatherInfoHeader);

        data.list.forEach(function (item) {
          var weatherFacts = document.createElement('p');
          weatherFacts.textContent = `Time: ${item.dt_txt}, Temperature: ${item.main.temp}°C, Description: ${item.weather[0].description}`;
          weatherDataContainer.appendChild(weatherFacts);
        });
      } else {
        var noDataText = document.createElement('p');
        noDataText.textContent = 'No weather data available for this location.';
        weatherDataContainer.appendChild(noDataText);
      }
    })
    .catch(function (error) { //print an error message if api is not returned
      // Handle errors here
      console.error('Error fetching weather data:', error);
      var errorText = document.createElement('p');
      errorText.textContent = 'Error fetching weather data. Please try again.';
      weatherDataContainer.appendChild(errorText);
    });
}

fetchWeatherButton.addEventListener('click', function () { //include a button for submitting the requested latitude and longitude
  var latInput = document.getElementById('lat-input').value;
  var lonInput = document.getElementById('lon-input').value;

  if (latInput && lonInput) {
    fetchWeatherData(latInput, lonInput);
  } else {
    alert('You must insert a lat and lon!');
  }
});

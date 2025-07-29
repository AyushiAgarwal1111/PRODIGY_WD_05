const apiKey = "7ac935b1ea0878b6c01d0da988d7e9ff"; // Your working API key

function displayWeather(data) {
  const weatherDiv = document.getElementById('weatherResult');

  // Handle API error (like city not found)
  if (data.cod !== 200) {
    weatherDiv.innerHTML = `<p style="color: red;"><strong>Error:</strong> ${data.message}</p>`;
    return;
  }

  const tempC = (data.main.temp - 273.15).toFixed(1);
  weatherDiv.innerHTML = `
    <h2>${data.name}, ${data.sys.country}</h2>
    <p><strong>Weather:</strong> ${data.weather[0].main} - ${data.weather[0].description}</p>
    <p><strong>Temperature:</strong> ${tempC} °C</p>
    <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
    <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
  `;
}

function getWeatherByCity() {
  const city = document.getElementById('cityInput').value.trim();
  if (!city) return alert("Please enter a city name (e.g., Delhi or Delhi, IN)");

  // encode city input safely for URL
  const encodedCity = encodeURIComponent(city);

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=${apiKey}`;
  fetch(url)
    .then(res => res.json())
    .then(data => {
      console.log("City weather data:", data); // for debugging
      displayWeather(data);
    })
    .catch(error => {
      console.error("Fetch error:", error);
      alert("Failed to fetch weather data");
    });
}

function getWeatherByLocation() {
  if (!navigator.geolocation) {
    alert("Geolocation is not supported by your browser");
    return;
  }

  navigator.geolocation.getCurrentPosition(position => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;
    fetch(url)
      .then(res => res.json())
      .then(data => {
        console.log("Location weather data:", data); // for debugging
        displayWeather(data);
      })
      .catch(error => {
        console.error("Geolocation fetch error:", error);
        alert("Failed to fetch weather data");
      });
  }, () => {
    alert("Unable to retrieve your location");
  });
}

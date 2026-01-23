const currentTemp = document.querySelector('#current-temp');
const weatherIcon = document.querySelector('#weather-icon');
const captionDesc = document.querySelector('figcaption');

const myKey = "235fcba2ca38088cdc671b7d1a9d78b8"
const myLat = "-12.0433"
const myLong = "-76.97107"

const url = `https://api.openweathermap.org/data/2.5/forecast?lat=${myLat}&lon=${myLong}&appid=${myKey}&units=imperial`;

async function apiFetch() {
    try {
        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();
            //console.log(data);
            displayResults(data);
            displayForecast(data);
        } else {
            throw Error(await response.text());
        }
    } catch (error) {
        console.log(error);
    }
}

function displayResults(data) {
    const current = data.list[0];

    const temp = current.main.temp;
    const high = current.main.temp_max;
    const low = current.main.temp_min;
    const humidity = current.main.humidity;
    const desc = current.weather[0].description;
    const icon = current.weather[0].icon;

    const sunrise = data.city.sunrise;
    const sunset = data.city.sunset;

    document.querySelector('#current-temp').innerHTML = `${Math.round(temp)}&deg;F`;
    document.querySelector('#weather-desc').textContent = desc;
    document.querySelector('#high-temp').textContent = `High: ${Math.round(high)}°`;
    document.querySelector('#low-temp').textContent = `Low: ${Math.round(low)}°`;
    document.querySelector('#humidity').textContent = `Humidity: ${humidity}%`;

    document.querySelector('#sunrise').textContent = `Sunrise: ${formatTime(sunrise)}`;
    document.querySelector('#sunset').textContent = `Sunset: ${formatTime(sunset)}`;

    const iconImg = document.querySelector('#weather-icon');
    iconImg.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
    iconImg.alt = desc;
}

function displayForecast(data) {
    const forecastContainer = document.querySelector('#forecast-list');
    forecastContainer.innerHTML = '';

    const days = [0, 8, 16];

    days.forEach((index, i) => {
        const forecast = data.list[index];
        const date = new Date(forecast.dt * 1000);

        const dayName =
            i === 0
                ? 'Today'
                : date.toLocaleDateString('en-US', { weekday: 'long' });

        const temp = Math.round(forecast.main.temp);

        const p = document.createElement('p');
        p.textContent = `${dayName}: ${temp}° F`;

        forecastContainer.appendChild(p);
    });
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
}

apiFetch();
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

    const petAdvice = getPetAdvice(temp, desc.toLowerCase());
    document.querySelector('#pet-advice').textContent = petAdvice;
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
        const tip = getDailyPetTip(temp);

        const div = document.createElement('div');
        div.classList.add('forecast-day');

        div.innerHTML = `
            <p><strong>${dayName}:</strong> ${temp}° F</p>
            <p class="pet-tip">${tip}</p>
        `;

        forecastContainer.appendChild(div);
    });
}

function getPetAdvice(tempF, desc) {
    let advice = "";

    if (tempF >= 85) {
        advice = "🐶🐱 Hot weather: Keep your pet hydrated, avoid walks at midday, and check pavement temperature.";
    } else if (tempF <= 60) {
        advice = "🐶🐱 Cold weather: Consider a sweater for small or senior pets and avoid cold drafts.";
    } else {
        advice = "🐶🐱 Mild weather: Great for walks! Bring water and watch for signs of tiredness.";
    }

    if (desc.includes("rain")) {
        advice += " 🌧️ Rainy conditions: Dry your pet well after walks to prevent skin issues.";
    }

    if (desc.includes("wind")) {
        advice += " 💨 Windy: Avoid long outdoor exposure and clean eyes and paws after.";
    }

    return advice;
}

function getDailyPetTip(tempF) {
    if (tempF >= 85) {
        return "🔥 Hot day: Walk early morning or evening. Extra water!";
    } else if (tempF <= 60) {
        return "❄️ Cool day: Keep your pet warm and limit long outdoor time.";
    } else {
        return "🐾 Great weather: Perfect for walks and playtime!";
    }
}

function formatTime(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit'
    });
}

apiFetch();
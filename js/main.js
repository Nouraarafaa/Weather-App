const apiKey = "0551b435a7d74f02b8b111000241212";
var SearchInput = document.getElementById('SearchInput');
var findBtn = document.getElementById('findBtn');

findBtn.addEventListener('click', () => {
    if (SearchInput.value.trim() != "") {
        GetData(SearchInput.value.trim());
        SearchInput.value = ""; 
    }
});

SearchInput.addEventListener('keypress', (event) => {
    if (event.key === "Enter" && SearchInput.value.trim() != "") {
        GetData(SearchInput.value.trim());
        SearchInput.value = ""; 
    }
});

async function GetData(city_country){
    const apiLink = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city_country}&days=3`;
    try {
        var response = await fetch(apiLink);
        if (!response.ok) {
            throw new Error("Failed to fetch weather data");
        }
        const data = await response.json(); 
        
        // Store the fetched data in localStorage
        localStorage.setItem("weatherData", JSON.stringify(data));
        
        // Call DisplayData with the newly fetched data
        DisplayData(data);
    } catch (error) {
        console.error("Error:", error.message);
    }
}

window.onload = () => {
    const savedData = localStorage.getItem("weatherData");
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        DisplayData(parsedData);
    }
};

function getDayOfWeek(dateString) {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const date = new Date(dateString);
    return daysOfWeek[date.getDay()];
}

function DisplayData(data) {
    document.getElementById('badges').innerHTML = `
        <div id="badge-1">
            <div class="top">
                <span>${getDayOfWeek(data.forecast.forecastday[0].date)}</span>
                <span>${data.forecast.forecastday[0].date}</span>
            </div>
            <div class="middle">
                <span>${data.location.name}</span>
                <p>${data.current.temp_c + "°C"}</p>
                <img src="${data.current.condition.icon}" class="main" alt="">
                <span class="blue">${data.current.condition.text}</span>
            </div>
            <div class="bottom">
                <img src="images/icon-umberella.png" alt="">
                <p>${data.current.humidity}%</p>
                <img src="images/icon-wind.png" alt="">
                <p>${data.current.wind_kph}km/h</p>
                <img src="images/icon-compass.png" alt="">
                <p>${data.current.wind_dir}</p>
            </div>
        </div>
        <div id="badge-2">
            <div class="top">
                <span>${getDayOfWeek(data.forecast.forecastday[1].date)}</span>
            </div>
            <div class="middle">
            <img src="${data.forecast.forecastday[1].day.condition.icon}" alt="">
                <span class="max-temp">${data.forecast.forecastday[1].day.maxtemp_c}°C</span>
                <p>${data.forecast.forecastday[1].day.mintemp_c}°C</p>
                <span class="blue">${data.forecast.forecastday[1].day.condition.text}</span>
            </div>
        </div>
        <div id="badge-3">
            <div class="top">
                <span>${getDayOfWeek(data.forecast.forecastday[2].date)}</span>
            </div>
            <div class="middle">
            <img src="${data.forecast.forecastday[2].day.condition.icon}" alt="">
                <span class="max-temp">${data.forecast.forecastday[1].day.maxtemp_c}°C</span>
                <p>${data.forecast.forecastday[1].day.mintemp_c}°C</p>
                <span class="blue">${data.forecast.forecastday[1].day.condition.text}</span>
            </div>
        </div>
    `;
}

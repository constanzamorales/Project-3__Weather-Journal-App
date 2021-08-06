/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '&appid=2de1e0b71614dec5ecd1e018c409e23c';
let baseURL = 'http://api.openweathermap.org/data/2.5/weather?q=';
const units = '&units=metric';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toUTCString();

// Function to clear inputs after refresh https://stackoverflow.com/questions/46133972/clear-input-field-on-page-refresh/46134438
window.onload = function () {
    document.getElementById('city').value = "";
    document.getElementById('feelings').value = "";
}


// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeather);
/* Function called by event listener */
function getWeather(event) {
    const city = document.getElementById('city').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(baseURL, city, units, apiKey)
    .then (function (weather) {
        const temperature = weather.main.temp;
        const feeling = feelings;
        postData('/addEntry', { temp: temperature, date: newDate, feeling: feeling })
        .then(() => {
            updateUI()
        });
    });
}


/* Function to GET Web API Data */
const getWeatherData = async (baseURL, city, units, apiKey) => {
    const response = await fetch(baseURL+city+units+apiKey);
    // Try calling the API
    try {
        const weather = await response.json();
        console.log(weather);
        return weather;
        // If that doesn't work, handle the error
    } catch(error) {
        console.log('Oops! There was an error in the GET data function', error);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });
    try {
        const newWeather = await response.json();
        console.log(newWeather);
        return newWeather;
    } catch(error) {
        console.log('Oops! There was an error in the POST data function!', error);
    }
}
/* Function to GET Project Data */
const getProjectData = async (url = '') => {
    const response = await fetch(url);
    try {
        const getData = await response.json()
    }
    catch(error) {
        console.log('Oh no! There was an error in the GET project data function', error);
    }
};

/* Updating UI */
const updateUI = async () => {
    const request = await fetch('/all');
    // Select entries sections to change visibility
    const noEntries = document.getElementById('noEntries');
    const entry = document.getElementById('entryHolder');
    try {
        const lastEntry = await request.json();
        document.getElementById('date').innerHTML = lastEntry['date'];
        document.getElementById('temp').innerHTML = `${lastEntry['temp']}°C`;
        document.getElementById('content').innerHTML = lastEntry['feeling'];

        noEntries.style.display = 'none';
        entry.style.visibility = 'visible';
    } catch (error) {
        console.log('There was an error updating the UI!', error);
    }
}


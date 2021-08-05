/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKey = '2de1e0b71614dec5ecd1e018c409e23c';
let baseURL = `api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', getWeather);
/* Function called by event listener */
function getWeather(event) {
    const zip = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;
    getWeatherData(baseURL, zip, apiKey)
    .then (function (weather) {
        const temperature = weather.main.temp;
        const feeling = feelings;
        postData('/addEntry', {
            temp: temperature, date: newDate, feeling: feeling
        })
        .then(() => {
            updateUI();
        });
    });
}
/* Function to GET Web API Data*/
const getWeatherData = async (baseURL, zip, apiKey) => {
    const response = await fetch(baseURL+zip+apiKey);
    // Try calling the API
    try {
        const weather = await response.json();
        console.log(weather);
        // If that doesn't work, handle the error
    } catch(error) {
        console.log('Oops! There was an error in the GET data function', error);
    }
}
/* Function to POST data */
const postData = async (url = '', data = {}) => {
    const response = await fetch(url, (
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    ));
    try {
        const newWeather = await.response.json();
        return newWeather;
    } catch(error) {
        console.log('Oops! There was an error in the POST data function!', error);
    }
}
/* Function to GET Project Data */
const getProjectData = async (url = '') => {
    const request = await fetch(url);
    try {
        const getData = await request.json();
    }
    catch(error) {
        console.log('Oh no! There was an error in the GET project data function', error);
    }
};

/* Updating UI */
const updateUI = async () => {
    const request = await fetch('/getData');
    try {
        const lastEntry = await request.json();
        document.getElementById('date').innerHTML = lastEntry['date'];
        document.getElementById('temp').innerHTML = lastEntry['temp'];
        document.getElementById('content').innerHTML = lastEntry['feeling'];
    } catch (error) {
        console.log('There was an error updating the UI!', error);
    }
}


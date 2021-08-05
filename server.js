// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();

// Middleware
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/*

// A more up to date way of doing the same, since bodyParser is deprecated https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated

app.user(express.urlencoded({ extended: false }));
app.user(express.json());

*/

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// Setup Server
const port = 8000;
const server = app.listen(port, listening);

function listening() {
    console.log(`Running on localhost: ${port}`);
}

// Initialize all route with a callback function
app.get('/all', function(request, response) {
    response.send(projectData);
});

// Post Route
// First create an array to hold data
const data = [];
// Create post() with a url path and a callback function
app.post('/addEntry', addEntry);
function addEntry (request, response) {
    console.log(request.body);
    projectData = request.body;
    response.send(projectData);
}


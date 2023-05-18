// Require Express to run server and routes
const express = require('express');
//start up an instance of app
const app = express();
// Cors for cross origin allowance
const cors = require('cors');
//Enable cors
app.use(cors());
//Require body-parser
const bodyParser = require('body-parser');
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Setup Server
// Initialize the main project folder
app.use(express.static('website'));

//function to complete get
const getAll = (req, res) => res.status(200).send(projectData);
//Get route
app.get('/all', getAll);


//function to complete post
const postData = (req, res) => {
  projectData = req.body;
  console.log(projectData);
  res.status(200).send(projectData);
}
//post route
app.post('/add', postData);

const http = require("http");
const hostname = "127.0.0.1";
const port = 8000;

// // Create HTTP server
// const server = http.createServer(function (req, res) {
//   // Set the response HTTP header with HTTP status and Content type
//   res.writeHead(200, { "Content-Type": "text/plain" });


// });
// Prints a log once the server starts listening
app.listen(port, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});


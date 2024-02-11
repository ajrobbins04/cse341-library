// include all necessary modules
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv').config(); // loads all environment variables from .env

const app = express();
const port = process.env.PORT || 8080;

// parses incoming json requests to
// access this data from req.body
app.use(bodyParser.json());
app.use(cors());

// create a port so the application can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});

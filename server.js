const express = require('express');
const cors = require('cors'); // cross-origin requests
const bodyParser = require('body-parser'); // parses json requests
const dotenv = require('dotenv').config(); // loads all environment variables from .env
const routes = require('./routes');
const { connectDB } = require('./db/connect');

const app = express();
const port = process.env.PORT || 8080;
connectDB();

// parses incoming json requests to
// access this data from req.body
app.use(bodyParser.json());
app.use(cors());

// router.use('/', swaggerRoutes); // mount to be included in apiDocs
// router.get('/', indexController.promptContactsRoute);
app.use('/', routes);

// create a port so the application can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});

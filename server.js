/* eslint-disable import/order */
const express = require('express');
const bodyParser = require('body-parser'); // parses json requests
const dotenv = require('dotenv').config(); // loads all environment variables from .env
const swaggerUi = require('swagger-ui-express'); // apiDocument user interface
const routes = require('./routes');
const { connectDB } = require('./db/connect');
const swaggerDocument = require('./swagger.json'); // apiDocument (must come after interface)
const error = require('./middleware/error');
const { authMiddleware } = require('./middleware/auth');
const { corsMiddleware } = require('./middleware/cors');

const app = express();
const port = process.env.PORT || 8080;

// handles possible errors internally
connectDB();

// parses incoming json requests to
// access this data from req.body
app.use(bodyParser.json());
app.use(corsMiddleware);

// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(authMiddleware);

// specify url paths for routes (includes books and auth) and apiDocumentation
app
  .use('/', routes)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(error.sendError500);

// create a port so the application can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});

/* eslint-disable import/order */
const express = require('express');
const bodyParser = require('body-parser'); // parses json requests
const dotenv = require('dotenv').config(); // loads all environment variables from .env
const routes = require('./routes');
const swaggerUi = require('swagger-ui-express'); // apiDocument user interface
const swaggerDocument = require('./swagger.json'); // apiDocument (must come after interface)
const { connectDB } = require('./db/connect');
const { sendError500 } = require('./middleware/error');
const { setUserLocals } = require('./middleware/auth');
const { authMiddleware } = require('./middleware/auth');
const { corsMiddleware } = require('./middleware/cors');
const expressLayouts = require('express-ejs-layouts');
const app = express();
const port = process.env.PORT || 8080;

// handles possible errors internally
connectDB();

// parses incoming json requests to
// access this data from req.body
app.use(bodyParser.json());
app.use(corsMiddleware);
app.set('view engine', 'ejs');
app.use(expressLayouts);
// auth router attaches /login, /logout, and /callback routes to the baseURL
app.use(authMiddleware);

// middleware to make the 'user' object available for all views
app.use(setUserLocals);

// specify url paths for routes (includes books and auth) and apiDocumentation
app
  .use('/', routes)
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(sendError500);

// create a port so the application can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});

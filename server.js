const express = require('express');
const cors = require('cors'); // cross-origin requests
const bodyParser = require('body-parser'); // parses json requests
const dotenv = require('dotenv').config(); // loads all environment variables from .env
const swaggerUi = require('swagger-ui-express'); // apiDocument user interface
const routes = require('./routes');
const { connectDB } = require('./db/connect');
const swaggerDocument = require('./swagger.json'); // apiDocument (must come after interface)
const error = require('./middleware/error');

const app = express();
const port = process.env.PORT || 8080;

// handles possible errors internally
connectDB();

// parses incoming json requests to
// access this data from req.body
app.use(bodyParser.json());

// Use cors middleware to handle CORS headers
const corsOptions = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
};
app.use(cors(corsOptions));

// specify url paths for apiDocumentation and books (which is in routes)
app
  .use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use('/', routes)
  .use(error.sendError500);

// create a port so the application can be tested on a browser
app.listen(port, () => {
  console.log(`Web Server is listening at port ${port}`);
});

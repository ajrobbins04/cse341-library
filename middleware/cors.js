const cors = require('cors'); // cross-origin requests

// configure cors middleware to handle CORS headers
const corsConfig = {
  origin: '*',
  methods: 'GET,PUT,POST,DELETE,OPTIONS',
};
const corsMiddleware = cors(corsConfig);
module.exports = { corsMiddleware };

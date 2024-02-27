const dotenv = require('dotenv').config(); // loads all environment variables from .env
const { auth } = require('express-openid-connect');

// stored in env for authentication security
const authSecret = process.env.AUTH_SECRET;
const port = process.env.PORT || 8080;

// use auth0 to handle authentication
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: authSecret,
  baseURL: `http://localhost:${port}`,
  clientID: 'cffc1WgDMqOZAuHhYGw5wtYiigmCZRIy',
  issuerBaseURL: 'https://dev-8qqmuiir80ktrcnx.us.auth0.com',
};

// initialize authentication middleware
const authMiddleware = auth(authConfig);

// makes the `user` object available for all views
const setUserLocals = (req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
};

module.exports = { authMiddleware, setUserLocals };

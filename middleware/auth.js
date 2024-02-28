const dotenv = require('dotenv').config(); // loads all environment variables from .env
const { auth } = require('express-openid-connect');

const port = process.env.PORT || 8080;

// use auth0 to handle authentication
const authConfig = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SESSION_SECRET,
  baseURL: `http://localhost:${port}`,
  clientID: process.env.AUTH0_CLIENT_ID,
  issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
};

// initialize authentication middleware
const authMiddleware = auth(authConfig);

// makes the `user` object available for all views
const setUserLocals = (req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
};

module.exports = { authMiddleware, setUserLocals };

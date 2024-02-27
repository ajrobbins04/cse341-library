// Middleware to make the `user` object available for all views
const setUserLocals = (req, res, next) => {
  res.locals.user = req.oidc.user;
  next();
};
const authenticateUser = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
};

module.exports = { setUserLocals, authenticateUser };

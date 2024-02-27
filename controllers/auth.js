const authenticateUser = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
};

module.exports = { authenticateUser };

const authSignIn = (req, res) => {
  res.send('index', {
    title: 'Auth0 Webapp sample Nodejs',
    isAuthenticated: req.oidc.isAuthenticated(),
  });
};

const renderUserProfile = (req, res) => {
  res.send('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page',
  });
};

const isAuthenticated = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
};

module.exports = { authSignIn, renderUserProfile, isAuthenticated };

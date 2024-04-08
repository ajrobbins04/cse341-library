const renderUserProfile = (req, res) => {
  res.json('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page',
  });
};

const authenticate = (req, res) => {
  res.send({
    title: 'Childrens Book API',
    isAuthenticated: req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out',
  });
};

module.exports = { renderUserProfile, authenticate };

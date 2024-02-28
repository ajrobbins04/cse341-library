const renderUserProfile = (req, res) => {
  res.json('profile', {
    userProfile: JSON.stringify(req.oidc.user, null, 2),
    title: 'Profile page',
  });
};

const isAuthenticated = (req, res) => {
  res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
};

module.exports = { renderUserProfile, isAuthenticated };

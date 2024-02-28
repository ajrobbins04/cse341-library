const { isAuthenticated } = require('./auth');

const displayIndexMsg = (req, res) => {
  res.send(
    `Add '/books' to the url to view all books, or '/api-docs' for API documentation!`,
  );
};

const displayIndexPage = (req, res) => {
  const authStatus = isAuthenticated(req, res);
  if (authStatus === 'Logged in') {
    displayIndexMsg(req, res);
  } else {
    // Handle case where user is not authenticated
    res.send('You must be logged in to view this content.');
  }
};
module.exports = { displayIndexPage };

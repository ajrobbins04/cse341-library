const { authenticateUser } = require('./auth');

const displayRootMsg = (req, res) => {
  res.send(
    `Add '/books' to the url to view all books, or '/api-docs' for API documentation!`,
  );
};

const displayRoot = (req, res) => {
  const authStatus = authenticateUser(req, res);
  if (authStatus === 'Logged in') {
    displayRootMsg(req, res);
  } else {
    // Handle case where user is not authenticated
    res.send('You must be logged in to view this content.');
  }
};
module.exports = { displayRoot };

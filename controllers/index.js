const displayRootMsg = (req, res) => {
  res.send(
    `Add '/books' to the url to view all books, or '/api-docs' for API documentation!`,
  );
};
module.exports = { displayRootMsg };

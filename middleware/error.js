const sendError500 = async (err, req, res, next) => {
  console.error('A server error has occurred:', err);

  res.status(500).json({
    error: 'A server error has occurred',
    details: err.message,
  });
};

module.exports = {
  sendError500,
};

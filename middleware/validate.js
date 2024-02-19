const validator = require('../helpers/validate');

const checkBook = async (req, res, next) => {
  const currentYear = new Date().getFullYear(); // max yearPublished value
  if (!req.body.description) {
    req.body.description = 'N/A'; // default description value when empty
  } else if (!req.body.authorFirstName) {
    req.body.authorFirstName = 'N/A'; // default authorFirstName value when empty
  }

  const validationRules = {
    title: 'required|string',
    description: 'string',
    authorFirstName: 'string|max:50',
    authorLastName: 'required|string|max:50',
    numAvailable: 'required|integer|min:0', // numAvailable cannot be in negatives
    numTotal: 'required|integer|min:1', // at least 1 book must exist in inventory
    yearPublished: `required|integer|min:1600|max:${currentYear}`,
  };

  await validator(req.body, validationRules, {}, (err, status) => {
    if (!status) {
      // sends 'precondition failed' http status code
      res.status(412).send({
        // properties are stored in the response body
        success: false,
        error: 'Book requirement validation failed',
        details: err,
      });
    } else {
      next(); // passes control to next middleware function w/o err if valid
    }
  }).catch((err) => next(err));
};
module.exports = {
  checkBook,
};

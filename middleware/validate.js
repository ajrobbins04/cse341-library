/* eslint-disable consistent-return */
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');
const validator = require('../helpers/validate');

const checkIdParams = async (req, res, next) => {
  // check that authorId is a string before converting into objectID
  if (typeof req.params.id !== 'string') {
    return res.status(412).send({
      success: false,
      error: 'ID must be entered as a string',
    });
  }
  const validId = new ObjectId(req.params.id);
  req.params.id = validId;
  next();
};

const checkAuthorField = async (req, res, next) => {
  // check that author field is a string before converting into objectID
  if (typeof req.body.author !== 'string') {
    return res.status(412).send({
      success: false,
      error: 'Author ID must be entered as a string',
    });
  }
  const authorId = new ObjectId(req.body.author);
  req.body.author = authorId;
  next();
};

const checkBook = async (req, res, next) => {
  const currentYear = new Date().getFullYear(); // to check max yearPublished value

  if (!req.body.genres) {
    req.body.genres = ['Unspecified']; // default genre when empty
  } else if (
    !Array.isArray(req.body.genres) ||
    req.body.genres.every((item) => typeof item !== 'string')
  ) {
    return res.status(412).send({
      success: false,
      error: 'Genres must be an array of strings',
    });
  }
  const genresOptions = [
    'Fiction',
    'Picture Books',
    'Fantasy',
    'Mystery',
    'Humor',
    'Folklore',
    'Historical Fiction',
    'Realistic Fiction',
    'Animal Fiction',
    'Non-Fiction',
    'Unspecified',
  ];

  // author validation handled by checkAuthorIdField() next
  const bookValidationRules = {
    title: 'required|string',
    description: 'required|string',
    author: 'required', // will be valid & converted to objectId by this point
    genres: {
      rule: 'isIn',
      options: genresOptions,
      message: `Genres must be one of the following: ${genresOptions.join(', ')}`,
    },
    numAvailable: 'required|integer|min:0', // numAvailable cannot be in negatives
    numTotal: 'required|integer|min:1', // at least 1 book must exist in inventory
    yearPublished: `required|integer|min:1600|max:${currentYear}`,
  };

  await validator(req.body, bookValidationRules, {}, (err, status) => {
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

const checkAuthor = async (req, res, next) => {
  if (!req.body.authorFirstName) {
    req.body.authorFirstName = 'N/A'; // default authorFirstName value when empty
  }

  const authorValidationRules = {
    authorFirstName: 'string|max:50',
    authorLastName: 'required|string|min:2|max:50',
  };

  await validator(req.body, authorValidationRules, {}, (err, status) => {
    if (!status) {
      // sends 'precondition failed' http status code
      res.status(412).send({
        // properties are stored in the response body
        success: false,
        error: 'Author requirement validation failed',
        details: err,
      });
    } else {
      next(); // passes control to next middleware function w/o err if valid
    }
  }).catch((err) => next(err));
};
module.exports = {
  checkIdParams,
  checkAuthorField,
  checkBook,
  checkAuthor,
};

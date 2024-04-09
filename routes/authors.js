// import express module from node_modules
const express = require('express');

// will contain the actions to be executed for defined routes
const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');

const router = express.Router();
router.get('/', authorsController.getAllAuthors);

// verify book data meets requirements before adding/updating it
router.post('/', validation.checkAuthor, authorsController.addAuthor);
router.put(
  '/:id',
  validation.checkIdParams, // first ensure id's validity
  validation.checkAuthor, // ensure additional rules are valid
  authorsController.updateAuthor,
);

router.get('/:id', validation.checkIdParams, authorsController.getAuthorById);

// TO DO: add referential integrity check!
router.delete('/:id', validation.checkIdParams, authorsController.deleteAuthor);

// get all books in inventory written by the same author
router.get(
  '/:id/books',
  validation.checkAuthorField,
  authorsController.getAllBooksByAuthorId,
);

module.exports = router;

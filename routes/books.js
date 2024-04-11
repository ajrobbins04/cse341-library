// import express module from node_modules
const express = require('express');
const { requiresAuth } = require('express-openid-connect');

// will contain the actions to be executed for defined routes
const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

const router = express.Router();

router.get('/', booksController.getAllBooks);

// verify book data meets requirements before adding/updating it
router.post('/', requiresAuth(), validation.checkBook, booksController.addBook);
router.put(
  '/:id',
  validation.checkIdParams, // ensure book ID is in a valid form
  validation.checkAuthorField, // ensure author ID is in a valid form
  validation.checkBook,
  booksController.updateBook,
);

router.get('/:id', validation.checkIdParams, booksController.getBookById);
router.delete('/:id', validation.checkIdParams, booksController.deleteBook);

module.exports = router;

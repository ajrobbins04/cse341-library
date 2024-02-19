// import express module from node_modules
const express = require('express');

// will contain the actions to be executed for defined routes
const booksController = require('../controllers/books');
const validation = require('../middleware/validate');

const router = express.Router();

router.get('/', booksController.getAllBooks);

// verify book data meets requirements before adding/updating it
router.post('/', validation.checkBook, booksController.addBook);
router.put('/:id', validation.checkBook, booksController.updateBook);

router.get('/:id', booksController.getBookById);
router.delete('/:id', booksController.deleteBook);

module.exports = router;

// import express module from node_modules
const express = require('express');

// will contain the actions to be executed for defined routes
const booksController = require('../controllers/books');

const router = express.Router();

router.get('/', booksController.getAllBooks);
router.post('/', booksController.addBook);

router.get('/:id', booksController.getBookById);
router.put('/:id', booksController.updateBook);
router.delete('/:id', booksController.deleteBook);

module.exports = router;

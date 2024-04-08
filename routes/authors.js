// import express module from node_modules
const express = require('express');

// will contain the actions to be executed for defined routes
const authorsController = require('../controllers/authors');
const validation = require('../middleware/validate');

const router = express.Router();
router.get('/', authorsController.getAllAuthors);

// verify book data meets requirements before adding/updating it
router.post('/', validation.checkAuthor, authorsController.addAuthor);
router.put('/:id', validation.checkAuthor, authorsController.updateAuthor);

router.get('/:id', authorsController.getAuthorById);
router.delete('/:id', authorsController.deleteAuthor);

module.exports = router;

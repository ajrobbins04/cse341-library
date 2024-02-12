// import express module from node_modules
const express = require('express');

// will contain the actions to be executed for defined routes
const booksController = require('../controllers/books');

const router = express.Router();

router.get('/', booksController.getAllData);
// router.post('/', contactsController.createContact);

// router.get('/:id', contactsController.getDataById);
// router.put('/:id', contactsController.updateContact);
// router.delete('/:id', contactsController.deleteContact);

module.exports = router;

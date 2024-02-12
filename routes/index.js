const express = require('express');
const bookRoutes = require('./books');
const indexController = require('../controllers/index');
const swaggerRoutes = require('./swagger');

const router = express.Router();

router.use('/', swaggerRoutes); // mount to be included in apiDocs
router.get('/', indexController.displayRootMsg);
router.use('/books', bookRoutes);

module.exports = router;

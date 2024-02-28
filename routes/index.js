const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const bookRoutes = require('./books');
const swaggerRoutes = require('./swagger');
const indexController = require('../controllers/index');
const authController = require('../controllers/auth');

const router = express.Router();

router.use('/', swaggerRoutes); // mount to be included in apiDocs
router.get('/', authController.authenticate); // handles user auth internally
router.get('/profile', requiresAuth(), authController.renderUserProfile);
router.use('/books', bookRoutes);

module.exports = router;

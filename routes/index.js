const express = require('express');
const { requiresAuth } = require('express-openid-connect');
const bookRoutes = require('./books');
const authorRoutes = require('./authors');
const swaggerRoutes = require('./swagger');
const authController = require('../controllers/auth');

const router = express.Router();

router.use('/', swaggerRoutes); // mount to be included in apiDocs
router.get('/', authController.authenticate); // handles user auth internally
router.get('/profile', requiresAuth(), authController.renderUserProfile);
router.use('/books', bookRoutes);
router.use('/authors', authorRoutes);

module.exports = router;

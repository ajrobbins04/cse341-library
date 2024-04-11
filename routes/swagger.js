const router = require('express').Router();
const swaggerUi = require('swagger-ui-express');
const { requiresAuth } = require('express-openid-connect');
const swaggerDocument = require('../swagger.json');

router.use('/api-docs', swaggerUi.serve); // serves Swagger ui assets
router.get('/api-docs', swaggerUi.setup(swaggerDocument)); // renders Swagger documentation

module.exports = router;

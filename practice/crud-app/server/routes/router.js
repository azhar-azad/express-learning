const express = require('express');
const router = express.Router();

const services = require('../services/render');
const controller = require('../controllers/controller');

/**
 * @description Root Route
 * @method GET /
 */
router.get('/', services.homeRoute);

/**
 * @description add users route
 * @method GET /add-user
 */
router.get('/add-user', services.addUserRoute);

/**
 * @description update users route
 * @method GET /update-user
 */
router.get('/update-user', services.updateUserRoute);

// API
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

module.exports = router;

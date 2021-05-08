const express = require('express');
const router = express.Router();

const services = require('../services/render');

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

module.exports = router;

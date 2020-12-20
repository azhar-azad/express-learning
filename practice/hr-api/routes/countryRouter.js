const express = require('express');
const {
  createCountry,
  getCountries
} = require('../controllers/countryController.js');

const countryRouter = express.Router();

// CREATE COUNTRY
countryRouter.post('/', createCountry);

// GET ALL COUNTRIES
countryRouter.get('/', getCountries);

module.exports = countryRouter;
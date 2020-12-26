const express = require('express');
const {
  createCountry,
  getCountries,
  getCountry,
  updateCountry,
  deleteCountry
} = require('../controllers/countryController.js');

const countryRouter = express.Router();

// CREATE COUNTRY
countryRouter.post('/', createCountry);

// GET ALL COUNTRIES
countryRouter.get('/', getCountries);

// GET COUNTRY BY ID
countryRouter.get('/:id', getCountry);

// UPDATE COUNTRY BY ID
countryRouter.put('/:id', updateCountry);

// DELETE COUNTRY BY ID
countryRouter.delete('/:id', deleteCountry);

module.exports = countryRouter;
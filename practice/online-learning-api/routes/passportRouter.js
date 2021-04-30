const express = require('express');

const {
  createPassport,
  getPassports,
  getPassport,
  updatePassport,
  deletePassport
} = require('../controllers/passportController.js');

const passportRouter = express.Router();

// CREATE PASSPORT
passportRouter.post('/', createPassport);

// GET ALL PASSPORTS
passportRouter.get('/', getPassports);

// GET PASSPORT
passportRouter.get('/:id', getPassport);

// UPDATE PASSPORT
passportRouter.patch('/:id', updatePassport);

// DELETE PASSPORT BY ID
passportRouter.delete('/:id', deletePassport);

module.exports = passportRouter;
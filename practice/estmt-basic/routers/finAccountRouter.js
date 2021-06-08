/**
 * @Path: /finAccounts
 * @Description:
 * */
const finAcctRouter = require('express').Router();
const {
  createFinAccount,
  getFinAccounts,
  getFinAccount,
  updateFinAccount,
  deleteFinAccount
} = require('../controllers/finAccountController');

/**
 * @URL: http://localhost:5000/api/{version}/finAccounts
 * @Description: Create a new FinAccount entity
 * @Method: POST
 * */
finAcctRouter.post('/', createFinAccount);

/**
 * @URL: http://localhost:5000/api/{version}/finAccounts
 * @Description: Get all FinAccount entities
 * @Method: GET
 * */
finAcctRouter.get('/', getFinAccounts);

/**
 * @URL: http://localhost:5000/api/{version}/finAccounts/{finAcctId}
 * @Description: Get a FinAccount entity by id
 * @Method: GET
 * */
finAcctRouter.get('/:id', getFinAccount);

/**
 * @URL: http://localhost:5000/api/{version}/finAccounts/{finAcctId}
 * @Description: Update a FinAccount entity by id
 * @Method: PUT
 * */
finAcctRouter.put('/:id', updateFinAccount);

/**
 * @URL: http://localhost:5000/api/{version}/finAccounts/{finAcctId}
 * @Description: Delete a FinAccount entity by id
 * @Method: DELETE
 * */
finAcctRouter.delete('/:id', deleteFinAccount);

module.exports = finAcctRouter;
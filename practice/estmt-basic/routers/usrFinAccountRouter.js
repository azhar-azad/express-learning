/**
 * @Path: /usrFinAccounts
 * @Description:
 * */
const usrFinAcctRouter = require('express').Router();
const {
  createUsrFinAccount,
  getUsrFinAccounts,
  getUsrFinAccount,
  updateUsrFinAccount,
  deleteUsrFinAccount
} = require('../controllers/usrFinAccountController');

/**
 * @URL: http://localhost:5000/api/{version}/usrFinAccounts
 * @Description: Create a new UsrFinAccount entity
 * @Method: POST
 * */
usrFinAcctRouter.post('/', createUsrFinAccount);

/**
 * @URL: http://localhost:5000/api/{version}/usrFinAccounts?
 * @Description: Get all UsrFinAccount entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: usrIds, acctIds/acctNums, usr, acct
 * */
usrFinAcctRouter.get('/', getUsrFinAccounts);

/**
 * @URL: http://localhost:5000/api/{version}/usrFinAccounts/{usrFinAccountId}
 * @Description: Get a UsrFinAccount entity by id
 * @Method: GET
 * */
usrFinAcctRouter.get('/:id', getUsrFinAccount);

/**
 * @URL: http://localhost:5000/api/{version}/usrFinAccounts/{usrFinAccountId}
 * @Description: Update a UsrFinAccount entity by id
 * @Method: PUT
 * */
usrFinAcctRouter.put('/:id', updateUsrFinAccount);

/**
 * @URL: http://localhost:5000/api/{version}/usrFinAccounts/{usrFinAccountId}
 * @Description: Delete a UsrFinAccount entity by id
 * @Method: DELETE
 * */
usrFinAcctRouter.delete('/:id', deleteUsrFinAccount);

module.exports = usrFinAcctRouter;
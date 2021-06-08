/**
 * @Path: /usrSessions
 * @Description:
 * */
const usrSessionRouter = require('express').Router();
const {
  createUsrSession,
  getUsrSessions,
  getUsrSession,
  updateUsrSession,
  deleteUsrSession
} = require('../controllers/usrSessionController');

/**
 * @URL: http://localhost:5000/api/{version}/usrSessions
 * @Description: Create a new UsrSession entity
 * @Method: POST
 * */
usrSessionRouter.post('/', createUsrSession);

/**
 * @URL: http://localhost:5000/api/{version}/usrSessions?
 * @Description: Get all UsrSession entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params:
 * */
usrSessionRouter.get('/', getUsrSessions);

/**
 * @URL: http://localhost:5000/api/{version}/usrSessions/{usrSessionId}
 * @Description: Get a UsrSession entity by id
 * @Method: GET
 * */
usrSessionRouter.get('/:id', getUsrSession);

/**
 * @URL: http://localhost:5000/api/{version}/usrSessions/{usrSessionId}
 * @Description: Update a UsrSession entity by id
 * @Method: PUT
 * */
usrSessionRouter.put('/:id', updateUsrSession);

/**
 * @URL: http://localhost:5000/api/{version}/usrSessions/{usrSessionId}
 * @Description: Delete a UsrSession entity by id
 * @Method: DELETE
 * */
usrSessionRouter.delete('/:id', deleteUsrSession);

module.exports = usrSessionRouter;
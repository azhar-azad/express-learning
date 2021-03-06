/**
 * @Path: /usrs
 * @Description:
 * */
const usrRouter = require('express').Router();
const {
  createUsr,
  getUsrs,
  getUsr,
  updateUsr,
  deleteUsr
} = require('../controllers/usrController');

/**
 * @URL: http://localhost:5000/api/{version}/usrs
 * @Description: Create a new Usr entity
 * @Method: POST
 * */
usrRouter.post('/', createUsr);

/**
 * @URL: http://localhost:5000/api/{version}/usrs
 * @Description: Get all Usr entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: fnames
 * */
usrRouter.get('/', getUsrs);

/**
 * @URL: http://localhost:5000/api/{version}/usrs/{usrId}
 * @Description: Get a Usr entity by id
 * @Method: GET
 * */
usrRouter.get('/:id', getUsr);

/**
 * @URL: http://localhost:5000/api/{version}/usrs/{usrId}
 * @Description: Update a Usr entity by id
 * @Method: PUT
 * */
usrRouter.put('/:id', updateUsr);

/**
 * @URL: http://localhost:5000/api/{version}/usrs/{usrId}
 * @Description: Delete a Usr entity by id
 * @Method: DELETE
 * */
usrRouter.delete('/:id', deleteUsr);

module.exports = usrRouter;
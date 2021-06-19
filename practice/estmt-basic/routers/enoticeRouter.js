/**
 * @Path: /enotices
 * @Description:
 * */
const enoticeRouter = require('express').Router();
const {
  createEnotice,
  getEnotices,
  getEnotice,
  updateEnotice,
  deleteEnotice
} = require('../controllers/enoticeController');

/**
 * @URL: http://localhost:5000/api/{version}/enotices
 * @Description: Create a new Enotice entity
 * @Method: POST
 * */
enoticeRouter.post('/', createEnotice);

/**
 * @URL: http://localhost:5000/api/{version}/enotices
 * @Description: Get all Enotice entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: enoticeTypes, acct(y/n), arch(y/n)
 * */
enoticeRouter.get('/', getEnotices);

/**
 * @URL: http://localhost:5000/api/{version}/enotices/{estmtDocId}
 * @Description: Get a Enotice entity by id
 * @Method: GET
 * */
enoticeRouter.get('/:id', getEnotice);

/**
 * @URL: http://localhost:5000/api/{version}/enotices/{estmtDocId}
 * @Description: Update a Enotice entity by id
 * @Method: PUT
 * */
enoticeRouter.put('/:id', updateEnotice);

/**
 * @URL: http://localhost:5000/api/{version}/enotices/{estmtDocId}
 * @Description: Delete a Enotice entity by id
 * @Method: DELETE
 * */
enoticeRouter.delete('/:id', deleteEnotice);

module.exports = enoticeRouter;
/**
 * @Path: /etaxes
 * @Description:
 * */
const etaxRouter = require('express').Router();
const {
  createEtax,
  getEtaxes,
  getEtax,
  updateEtax,
  deleteEtax
} = require('../controllers/etaxController');

/**
 * @URL: http://localhost:5000/api/{version}/etaxes
 * @Description: Create a new Etax entity
 * @Method: POST
 * */
etaxRouter.post('/', createEtax);

/**
 * @URL: http://localhost:5000/api/{version}/etaxes
 * @Description: Get all Etax entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: etaxTypes, acct(y/n), arch(y/n)
 * */
etaxRouter.get('/', getEtaxes);

/**
 * @URL: http://localhost:5000/api/{version}/etaxes/{etaxId}
 * @Description: Get a Etax entity by id
 * @Method: GET
 * */
etaxRouter.get('/:id', getEtax);

/**
 * @URL: http://localhost:5000/api/{version}/etaxes/{etaxId}
 * @Description: Update a Etax entity by id
 * @Method: PUT
 * */
etaxRouter.put('/:id', updateEtax);

/**
 * @URL: http://localhost:5000/api/{version}/etaxes/{etaxId}
 * @Description: Delete a Etax entity by id
 * @Method: DELETE
 * */
etaxRouter.delete('/:id', deleteEtax);

module.exports = etaxRouter;
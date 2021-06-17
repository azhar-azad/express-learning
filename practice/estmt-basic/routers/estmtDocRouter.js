/**
 * @Path: /estmtDocs
 * @Description:
 * */
const estmtDocRouter = require('express').Router();
const {
  createEstmtDoc,
  getEstmtDocs,
  getEstmtDoc,
  updateEstmtDoc,
  deleteEstmtDoc
} = require('../controllers/estmtDocController');

/**
 * @URL: http://localhost:5000/api/{version}/estmtDocs
 * @Description: Create a new EstmtDoc entity
 * @Method: POST
 * */
estmtDocRouter.post('/', createEstmtDoc);

/**
 * @URL: http://localhost:5000/api/{version}/estmtDocs
 * @Description: Get all EstmtDoc entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: stmtTypes, acct(y/n)
 * */
estmtDocRouter.get('/', getEstmtDocs);

/**
 * @URL: http://localhost:5000/api/{version}/estmtDocs/{estmtDocId}
 * @Description: Get a EstmtDoc entity by id
 * @Method: GET
 * */
estmtDocRouter.get('/:id', getEstmtDoc);

/**
 * @URL: http://localhost:5000/api/{version}/estmtDocs/{estmtDocId}
 * @Description: Update a EstmtDoc entity by id
 * @Method: PUT
 * */
estmtDocRouter.put('/:id', updateEstmtDoc);

/**
 * @URL: http://localhost:5000/api/{version}/estmtDocs/{estmtDocId}
 * @Description: Delete a EstmtDoc entity by id
 * @Method: DELETE
 * */
estmtDocRouter.delete('/:id', deleteEstmtDoc);

module.exports = estmtDocRouter;
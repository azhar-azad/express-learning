/**
 * @Path: /paperlesses
 * @Description:
 * */
const paperless = require('express').Router();
const {
  createPaperless,
  getPaperlesses,
  getPaperless,
  updatePaperless,
  deletePaperless
} = require('../controllers/paperlessController');

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses
 * @Description: Create a new Paperless entity
 * @Method: POST
 * */
paperless.post('/', createPaperless);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses
 * @Description: Get all Paperless entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: old, new, stmtTypes, acct(y/n)
 * */
paperless.get('/', getPaperlesses);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses/{pId}
 * @Description: Get a Paperless entity by id
 * @Method: GET
 * */
paperless.get('/:id', getPaperless);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses/{pId}
 * @Description: Update a Paperless entity by id
 * @Method: PUT
 * */
paperless.put('/:id', updatePaperless);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses/{pId}
 * @Description: Delete a Paperless entity by id
 * @Method: DELETE
 * */
paperless.delete('/:id', deletePaperless);

module.exports = paperless;
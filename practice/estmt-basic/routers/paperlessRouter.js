/**
 * @Path: /paperlesses
 * @Description:
 * */
const paperlessRouter = require('express').Router();
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
paperlessRouter.post('/', createPaperless);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses
 * @Description: Get all Paperless entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: old, new, stmtTypes, acct(y/n)
 * */
paperlessRouter.get('/', getPaperlesses);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses/{pId}
 * @Description: Get a Paperless entity by id
 * @Method: GET
 * */
paperlessRouter.get('/:id', getPaperless);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses/{pId}
 * @Description: Update a Paperless entity by id
 * @Method: PUT
 * */
paperlessRouter.put('/:id', updatePaperless);

/**
 * @URL: http://localhost:5000/api/{version}/paperlesses/{pId}
 * @Description: Delete a Paperless entity by id
 * @Method: DELETE
 * */
paperlessRouter.delete('/:id', deletePaperless);

module.exports = paperlessRouter;
/**
 * @Path: /paperless2
 * @Description:
 * */
const paperless2Router = require('express').Router();
const {
  createPaperless2,
  getPaperless2s,
  getPaperless2,
  updatePaperless2,
  deletePaperless2
} = require('../controllers/paperless2Controller');

/**
 * @URL: http://localhost:5000/api/{version}/paperless2
 * @Description: Create a new Paperless2 entity
 * @Method: POST
 * */
paperless2Router.post('/', createPaperless2);

/**
 * @URL: http://localhost:5000/api/{version}/paperless2
 * @Description: Get all Paperless2 entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: old, new, stmtTypes, acct(y/n)
 * */
paperless2Router.get('/', getPaperless2s);

/**
 * @URL: http://localhost:5000/api/{version}/paperless2/{paperless2Id}
 * @Description: Get a Paperless2 entity by id
 * @Method: GET
 * */
paperless2Router.get('/:id', getPaperless2);

/**
 * @URL: http://localhost:5000/api/{version}/paperless2/{paperless2Id}
 * @Description: Update a Paperless2 entity by id
 * @Method: PUT
 * */
paperless2Router.put('/:id', updatePaperless2);

/**
 * @URL: http://localhost:5000/api/{version}/paperless2/{paperless2Id}
 * @Description: Delete a Paperless2 entity by id
 * @Method: DELETE
 * */
paperless2Router.delete('/:id', deletePaperless2);

module.exports = paperless2Router;
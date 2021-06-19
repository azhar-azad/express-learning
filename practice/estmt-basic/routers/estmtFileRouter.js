/**
 * @Path: /estmtFiles
 * @Description:
 * */
const estmtFileRouter = require('express').Router();
const {
  createEstmtFile,
  getEstmtFiles,
  getEstmtFile,
  updateEstmtFile,
  deleteEstmtFile
} = require('../controllers/estmtFileController');

/**
 * @URL: http://localhost:5000/api/{version}/estmtFiles
 * @Description: Create a new EstmtFile entity
 * @Method: POST
 * */
estmtFileRouter.post('/', createEstmtFile);

/**
 * @URL: http://localhost:5000/api/{version}/estmtFiles
 * @Description: Get all EstmtFile entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: stmtTypes, esd(y/n), arch(y/n), acct(y/n)
 * */
estmtFileRouter.get('/', getEstmtFiles);

/**
 * @URL: http://localhost:5000/api/{version}/estmtFiles/{estmtFileId}
 * @Description: Get a EstmtFile entity by id
 * @Method: GET
 * */
estmtFileRouter.get('/:id', getEstmtFile);

/**
 * @URL: http://localhost:5000/api/{version}/estmtFiles/{estmtFileId}
 * @Description: Update a EstmtFile entity by id
 * @Method: PUT
 * */
estmtFileRouter.put('/:id', updateEstmtFile);

/**
 * @URL: http://localhost:5000/api/{version}/estmtFiles/{estmtFileId}
 * @Description: Delete a EstmtFile entity by id
 * @Method: DELETE
 * */
estmtFileRouter.delete('/:id', deleteEstmtFile);

module.exports = estmtFileRouter;
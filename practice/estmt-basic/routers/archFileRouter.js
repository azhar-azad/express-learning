/**
 * @Path: /archFiles
 * @Description:
 * */
const archFileRouter = require('express').Router();
const {
  createArchFile,
  getArchFiles,
  getArchFile,
  updateArchFile,
  deleteArchFile
} = require('../controllers/archFileController');

/**
 * @URL: http://localhost:5000/api/{version}/archFiles
 * @Description: Create a new ArchFile entity
 * @Method: POST
 * */
archFileRouter.post('/', createArchFile);

/**
 * @URL: http://localhost:5000/api/{version}/archFiles
 * @Description: Get all ArchFile entities
 * @Method: GET
 * */
archFileRouter.get('/', getArchFiles);

/**
 * @URL: http://localhost:5000/api/{version}/archFiles/{archFileId}
 * @Description: Get a ArchFile entity by id
 * @Method: GET
 * */
archFileRouter.get('/:id', getArchFile);

/**
 * @URL: http://localhost:5000/api/{version}/archFiles/{archFileId}
 * @Description: Update a ArchFile entity by id
 * @Method: PUT
 * */
archFileRouter.put('/:id', updateArchFile);

/**
 * @URL: http://localhost:5000/api/{version}/archFiles/{archFileId}
 * @Description: Delete a ArchFile entity by id
 * @Method: DELETE
 * */
archFileRouter.delete('/:id', deleteArchFile);

module.exports = archFileRouter;
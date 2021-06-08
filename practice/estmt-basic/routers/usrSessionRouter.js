/**
 * @Path: /usrMappings
 * @Description:
 * */
const usrMappingRouter = require('express').Router();
const {
  createUsrMapping,
  getUsrMappings,
  getUsrMapping,
  updateUsrMapping,
  deleteUsrMapping
} = require('../controllers/usrMappingController');

/**
 * @URL: http://localhost:5000/api/{version}/usrMappings
 * @Description: Create a new UsrMapping entity
 * @Method: POST
 * */
usrMappingRouter.post('/', createUsrMapping);

/**
 * @URL: http://localhost:5000/api/{version}/usrMappings?cifNums&orgIds&usrIds
 * @Description: Get all UsrMapping entities
 * @Method: GET
 * @Special: Use query parameter to search records by cif_num, org_id, usr_id
 * */
usrMappingRouter.get('/', getUsrMappings);

/**
 * @URL: http://localhost:5000/api/{version}/usrMappings/{usrMappingId}
 * @Description: Get a UsrMapping entity by id
 * @Method: GET
 * */
usrMappingRouter.get('/:id', getUsrMapping);

/**
 * @URL: http://localhost:5000/api/{version}/usrMappings/{usrMappingId}
 * @Description: Update a UsrMapping entity by id
 * @Method: PUT
 * */
usrMappingRouter.put('/:id', updateUsrMapping);

/**
 * @URL: http://localhost:5000/api/{version}/usrMappings/{usrMappingId}
 * @Description: Delete a UsrMapping entity by id
 * @Method: DELETE
 * */
usrMappingRouter.delete('/:id', deleteUsrMapping);

module.exports = usrMappingRouter;
/**
 * @Path: /organizations
 * @Description:
 * */
const orgRouter = require('express').Router();
const {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization
} = require('../controllers/orgController');

/**
 * @URL: http://localhost:5000/api/{version}/organizations
 * @Description: Create a new Organization entity
 * @Method: POST
 * */
orgRouter.post('/', createOrganization);

/**
 * @URL: http://localhost:5000/api/{version}/organizations
 * @Description: Get all Organization entities
 * @Method: GET
 * @Special: Can filter records using query parameters
 * @Allowed_Query_Params: orgNames
 * Example: /organizations?orgNames=adcu,oscu
 * */
orgRouter.get('/', getOrganizations);

/**
 * @URL: http://localhost:5000/api/{version}/organizations/{orgId}
 * @Description: Get a Organization entity by id
 * @Method: GET
 * */
orgRouter.get('/:id', getOrganization);

/**
 * @URL: http://localhost:5000/api/{version}/organizations/{orgId}
 * @Description: Update a Organization entity by id
 * @Method: PUT
 * */
orgRouter.put('/:id', updateOrganization);

/**
 * @URL: http://localhost:5000/api/{version}/organizations/{orgId}
 * @Description: Delete a Organization entity by id
 * @Method: DELETE
 * */
orgRouter.delete('/:id', deleteOrganization);

module.exports = orgRouter;
/**
 * @Path: /users
 * @URL: http://localhost:5000/api/{version}/users
 * @Description:
 * */
const router = require('express').Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserCount,
  loginUser,
  registerUser
} = require('./userController');

/**
 * @URL: http://localhost:5000/api/{version}/users
 * @Description: Create a new User entity
 * @Method: POST
 * */
router.post('/', createUser);

/**
 * @URL: http://localhost:5000/api/{version}/users
 * @Description: Get all User entities
 * @Method: GET
 * */
router.get('/', getUsers);

/**
 * @URL: http://localhost:5000/api/{version}/users/{userId}
 * @Description: Get a User entity by id
 * @Method: GET
 * */
router.get('/:id', getUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/{userId}
 * @Description: Update a User entity by id
 * @Method: PUT
 * */
router.put('/:id', updateUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/{userId}
 * @Description: Delete a User entity by id
 * @Method: DELETE
 * */
router.delete('/:id', deleteUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/get/count
 * @Description: Get count of User entities
 * @Method: GET
 * */
router.get('/get/count', getUserCount);

/**
 * @URL: http://localhost:5000/api/{version}/users/login
 * @Description: Login a User entity by email and password
 * @Method: POST
 * */
router.post('/login', loginUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/register
 * @Description: Create a new User entity
 * @Method: POST
 * */
router.post('/register', registerUser);

module.exports = router;
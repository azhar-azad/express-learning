/**
 * @Path: /users
 * @Description:
 * */
const userRouter = require('express').Router();
const {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  loginUser,
  getUserCount
} = require('../controllers/userController');

/**
 * @URL: http://localhost:5000/api/{version}/users
 * @Description: Create a new User entity
 * @Method: POST
* */
userRouter.post('/', createUser);

/**
 * @URL: http://localhost:5000/api/{version}/users
 * @Description: Get all User entities
 * @Method: GET
 * */
userRouter.get('/', getUsers);

/**
 * @URL: http://localhost:5000/api/{version}/users/{userId}
 * @Description: Get a User entity by id
 * @Method: GET
 * */
userRouter.get('/:id', getUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/{userId}
 * @Description: Update a User entity by id
 * @Method: PUT
 * */
userRouter.put('/:id', updateUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/{userId}
 * @Description: Delete a User entity by id
 * @Method: DELETE
 * */
userRouter.delete('/:id', deleteUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/login
 * @Description: Login a User entity by email and password
 * @Method: POST
 * */
userRouter.post('/login', loginUser);

/**
 * @URL: http://localhost:5000/api/{version}/users/get/count
 * @Description: Get count of User entities
 * @Method: GET
 * */
userRouter.get('/get/count', getUserCount);

module.exports = userRouter;
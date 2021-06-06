import express from 'express';

import {
  createUser,
  getUserById,
  getUsers,
  deleteUserById,
  updateUserById
} from "../controllers/userController.js";

const router = express.Router();

// all routers in here are starting with /users
// get all users
router.get('/', getUsers);

// create user
router.post('/', createUser);

// get user by id
router.get('/:id', getUserById);

// delete user by id
router.delete('/:id', deleteUserById);

// update user by id
router.patch('/:id', updateUserById);

export default router;
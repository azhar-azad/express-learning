import {v4 as uuidv4} from "uuid";

let users = [
  {
    firstName: "John",
    lastName: "Doe",
    age: 25
  },
  {
    firstName: "Jane",
    lastName: "Doe",
    age: 24
  }
];

export const getUsers = (req, res) => {
  console.log('GET /users');
  res.send(users);
};

export const createUser = (req, res) => {
  console.log('POST /users');
  
  const user = req.body;
  const userId = uuidv4();
  
  const userWithId = { ...user, id: userId };
  users.push(userWithId);
  
  res.send(`User with the name ${user.firstName} added to the database!`);
};

export const getUserById = (req, res) => {
  console.log('GET /users/id');
  
  const { id } = req.params;
  
  const user = users.find(user => user.id === id);
  
  res.send(user);
};

export const deleteUserById = (req, res) => {
  console.log('DELETE /users/id');
  
  const { id } = req.params;
  
  users = users.filter(user => user.id !== id);
  
  res.send(`User with the id ${id} deleted from the database.`);
};

export const updateUserById = (req, res) => {
  console.log('PATCH /users/id');
  
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;
  
  const user = users.find(user => user.id === id);
  
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;
  
  res.send(`User with the id ${id} is updated!`);
};
const User = require('./user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  console.log('::::::[createUserApi]::::::');

  const userData = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10),
    phone: req.body.phone,
    address: req.body.address,
    isAdmin: req.body.isAdmin
  });

  userData.save()
    .then(createdUser => res.status(201).json(createdUser))
    .catch(err => res.status(500).json({
      success: false,
      error: err
    }));
};

const getUsers = (req, res) => {
  console.log('::::::[getUsersApi]::::::');

  User.find().select('-passwordHash')
    .then(users => res.status(200).json(users))
    .catch(err => res.status(500).json({
      success: false,
      message: 'Failed to fetch users',
      error: err
    }));
};

const getUser = (req, res) => {
  console.log('::::::[getUserApi]::::::');

  User.findById(req.params.id).select('-passwordHash')
    .then(user => res.status(200).json(user))
    .catch(err => res.status(500).json({
      success: false,
      message: `Failed to fetch user with id: ${req.params.id}`,
      error: err
    }));
};

const updateUser = (req, res) => {
  console.log('::::::[updateUserApi]::::::');

  res.status(400).json({
    success: false,
    message: 'Not yet implemented, will be implemented after JWT implementation',
    error: err
  });
};

const deleteUser = (req, res) => {
  console.log('::::::[deleteUserApi]::::::');

  User.findByIdAndRemove(req.params.id)
    .then(deletedUser => {
      if (deletedUser)
        return res.status(200).json({success: true, message: 'User is deleted'});
      else
        return res.status(404).json({success: false, message: 'User not found'});
    })
    .catch(err => res.status(400).json({success: false, error: err}));
};

const getUserCount = (req, res) => {
  console.log('::::::[getUserCountApi]::::::');
};

const loginUser = async (req, res) => {
  console.log('::::::[loginUserApi]::::::');

  const user = await User.findOne({email: req.body.email});

  if (!user)
    return res.status(400).json('User is not found');

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      { // payload to add in jwt
        userId: user.id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_SECRET, // secret private key
      { expiresIn: '1d' } // token expiration time
    );

    res.status(200).json({
      user: user.email,
      token: token
    });
  }
  else {
    res.status(400).json('Wrong Password');
  }
};

const registerUser = (req, res) => {
  console.log('::::::[registerUserApi]::::::');
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
  getUserCount,
  loginUser,
  registerUser
};
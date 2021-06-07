const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const createUser = (req, res) => {
  const userData = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10), // salt can be anything
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country
  });

  userData.save()
    .then(createdUser => res.status(201).json(createdUser))
    .catch(err => res.status(500).json({
      error: err,
      success: false
    }));
};

const getUsers = async (req, res) => {
  const users = await User.find().select('-passwordHash');

  if (!users) {
    res.status(500).json({
      message: 'Failed to fetch users',
      success: false
    });
  }

  res.status(200).json(users);
};

const getUser = async (req, res) => {
  const user = await User.findById(req.params.id).select('-passwordHash');

  if (!user) {
    res.status(500).json({
      message: `Failed to fetch user with id ${req.params.id}`,
      success: false
    });
  }

  res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const user = await User.findByIdAndUpdate(
    req.params.id, {
      name: req.body.name,
      icon: req.body.icon,
      color: req.body.color
    }, { new: true }
  );

  if (!user)
    return res.status(400).send('Failed to update user');

  res.send(user);
};

const deleteUser = (req, res) => {
  User.findByIdAndRemove(req.params.id)
    .then(deletedUser => {
      if (deletedUser) {
        return res.status(200).json({success: true, message: 'User is deleted'});
      }
      else {
        return res.status(404).json({success: false, message: 'User not found'});
      }
    })
    .catch(err => {
      return res.status(400).json({success: false, error: err});
    });
};

const getUserCount = (req, res) => {

  User.countDocuments()
    .then(count => res.json({
      userCount: count
    }))
    .catch(err => res.status(400).json({
      success: false,
      error: err
    }));
};

const loginUser = async (req, res) => {
  const user = await User.findOne({email: req.body.email});

  if (!user) {
    return res.status(400).json('User is not found');
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      { // pass the data you want with this token in this payload
        userId: user.id,
        isAdmin: user.isAdmin
      },
      process.env.JWT_TOKEN_SECRET, // secret private key .. it can be any string
      {expiresIn: '1d'} // expiration time for token .. it can be 1d, 1w, 5d
    );

    res.status(200).json({user: user.email, token: token});
  }
  else {
    res.status(400).json('Wrong Password');
  }
};

const registerUser = (req, res) => {
  const userData = new User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: bcrypt.hashSync(req.body.password, 10), // salt can be anything
    phone: req.body.phone,
    isAdmin: req.body.isAdmin,
    apartment: req.body.apartment,
    street: req.body.street,
    city: req.body.city,
    zip: req.body.zip,
    country: req.body.country
  });

  userData.save()
    .then(createdUser => res.status(201).json(createdUser))
    .catch(err => res.status(500).json({
      error: err,
      success: false
    }));
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
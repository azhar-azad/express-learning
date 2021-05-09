const Userdb = require('../models/model');

// check
exports.check = (req, res) => {
  res.send('OK from controller.');
};

// create and save new user
exports.create = (req, res) => {

  // validate request
  if (!req.body) { // post request with empty body
    res.send(400).send({message: 'Content can not be empty!'});
    return;
  }

  // new user
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  });

  // save user in the database
  user.save(user).then(data => {
    res.send(data)
  }).catch(err => {
    res.status(500).send({
      message: err.message || 'Some error occurred while creating a new user'
    });
  });
};

// retrieve and return all-user/single-user
exports.find = (req, res) => {
  
  Userdb.find().then(user => {
    res.send(user);
  }).catch(err => {
    res.status(500).send({message: err.message || 'Error occurred while retrieving user information'});
  });
};

// update a new identified user by user id
exports.update = (req, res) => {
  
  if (!req.body) {
    return res.status(400).send({message: 'Data to update can not be empty'});
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(data => {
    if (!data) {
      res.status(404).send({message: `Cannot update user with ${id}. Maybe user not found!`});
    } else {
      res.send(data);
    }
  }).catch(err => {
    res.status(500).send({message: 'Error updating user information!'});
  })
};

// delete a user with specified user id
exports.delete = (req, res) => {
  
};
const mongoose = require('mongoose');
const Usr = require('../models/usr');

/**
 * @Dependency: No dependency
 * */

const createUsr = async (req, res) => {
  console.log(':::::[createUsrApi]:::::');

  const usrData = new Usr({
    usr_firstname: req.body.usr_firstname,
    usr_middlename: req.body.usr_middlename,
    usr_lastname: req.body.usr_lastname,
    type: req.body.type
  });

  usrData.save()
    .then(usr => res.status(201).json(usr))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create Usr`
    }));
};

const getUsrs = (req, res) => {
  console.log(':::::[getUsrsApi]:::::');

  Usr.find()
    .sort({'usr_firstname': 1})
    .then(usrs => res.status(200).json(usrs))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch Usr data`
    }));
};

const getUsr = (req, res) => {
  console.log(':::::[getUsrApi]:::::');

  Usr.findById(req.params.id)
    .then(usr => res.status(200).json(usr))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch Usr with id: ${req.params.id}`
    }));
};

const updateUsr = async (req, res) => {
  console.log(':::::[updateUsrApi]:::::');

  const updatedUsrData = {
    usr_firstname: req.body.usr_firstname,
    usr_middlename: req.body.usr_middlename,
    usr_lastname: req.body.usr_lastname,
    type: req.body.type
  };

  Usr.findByIdAndUpdate(req.params.id, updatedUsrData, {new: true})
    .then(updatedUsr => res.json(updatedUsr))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update Usr with id: ${req.params.id}`
    }));
};

const deleteUsr = (req, res) => {
  console.log(':::::[deleteUsrApi]:::::');

  Usr.findByIdAndRemove(req.params.id)
    .then(deletedUsr => {
      if (deletedUsr)
        return res.status(200).json({success: true, message: 'Usr is deleted'})
      else
        return res.status(404).json({success: false, message: 'Usr not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted Usr with id: ${req.params.id}`
    }));
};

module.exports = {
  createUsr,
  getUsrs,
  getUsr,
  updateUsr,
  deleteUsr
};
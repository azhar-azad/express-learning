const Passport = require('../models/Passport.js');
const Student = require('../models/Student.js');

const createPassport = async (req, res) => {
  try {
    const passport = new Passport(req.body);
    await passport.save();
    
    const student = await Student.findById({ _id: passport.forStudent });
    student.passport = passport;
    await student.save();
    
    res.status(201).json({
      success: true,
      data: passport
    });
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getPassports = async (req, res) => {
  try {
    const passports = await Passport.find();
    res.json({
      success: true,
      data: passports
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const getPassport = async (req, res) => {

};

const updatePassport = async (req, res) => {

};

const deletePassport = async (req, res) => {
  try {
    const passport = await Passport.findById(req.params.id);
    if (passport === null) {
      sendError(res, 404, 'Passport is not found');
      return;
    }
    await passport.remove();
    res.json({
      success: true,
      data: `Passport Deleted: ${passport.number}`
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

// PRIVATE METHODS ONLY FOR THIS MODULE
const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  createPassport,
  getPassports,
  getPassport,
  updatePassport,
  deletePassport
};
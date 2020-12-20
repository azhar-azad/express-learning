const Student = require('../models/Student.js');

const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    res.status(201).json({
      success: true,
      data: student
    });
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getStudents = async (req, res) => {
  try {
    const students = await Student.find();
    res.json({
      success: true,
      data: students
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const getStudent = async (req, res) => {

};

const updateStudent = async (req, res) => {

};

const deleteStudent = async (req, res) => {

};

// PRIVATE METHODS ONLY FOR THIS MODULE
const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
};
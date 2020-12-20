const Student = require('../models/Student.js');
const Course = require('../models/Course.js');

const createStudent = async (req, res) => {
  try {
    const student = new Student(req.body);
    await student.save();
    
    student.enrolledCourses.forEach( async (enrlCourse) => {
      const course = await Course.findById({ _id: enrlCourse });
      course.enrolledStudents.push(student);
      await course.save();
    });
    
    // const courses = await Course.findById({ _id: student.enrolledCourses });
    
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
  try {
    const student = await Student.findById(req.params.id);
    
    if (student === null) {
      sendError(res, 404, 'Student is not found');
      return;
    }
    
    res.json({
      success: true,
      data: student
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const updateStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    
    if (student === null) {
      sendError(res, 404, 'Student is not found');
      return;
    }
    
    const { name, age } = req.body;
    
    if (name) student.name = name;
    if (age) student.age = age;
    
    await student.save();
    
    res.json({
      success: true,
      data: student
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const deleteStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (student === null) {
      sendError(res, 404, 'Student is not found');
      return;
    }
    await student.remove();
    res.json({
      success: true,
      data: `Student Deleted: ${student.name}`
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
  createStudent,
  getStudents,
  getStudent,
  updateStudent,
  deleteStudent
};
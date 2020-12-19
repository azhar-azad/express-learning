const Course = require('../models/Course.js');

const createCourse = async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.status(201).json({
      success: true,
      data: course
    });
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getCourses = async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({
      success: true,
      data: courses
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);
    if (course === null) {
      sendError(res, 404, 'Course is not found');
      return;
    }
    await course.remove();
    res.json({
      success: true,
      data: `Course Deleted: ${course.name}`
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
  createCourse,
  getCourses,
  deleteCourse
};
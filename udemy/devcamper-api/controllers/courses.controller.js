const Course = require('../models/Course');
const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.middleware');

/** 
 * @description   Get all courses
 * @method        GET 
 * @route         /api/v1/courses
 * @route         /api/v1/bootcamps/:bootcampId/courses
 * @access        Public
*/
exports.getCourses = asyncHandler( async (req, res, next) => {
  if (req.params.bootcampId) {
    const courses = await Course.find({ bootcamp: req.params.bootcampId });

    return res.staus(200).json({
      success: true,
      count: courses.length,
      data: courses
    });
  } else {
    res.status(200).json(res.advancedResults);
  }
});

/** 
 * @description   Get single courses
 * @method        GET 
 * @route         /api/v1/courses/:id
 * @access        Public
*/
exports.getCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id).populate({
    path: 'bootcamp',
    select: 'name description'
  });

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: course
  });
});

/** 
 * @description   Add course
 * @method        POST 
 * @route         /api/v1/bootcamps/:bootcampId/courses/
 * @access        Private
*/
exports.createCourse = asyncHandler( async (req, res, next) => {
  req.body.bootcamp = req.params.bootcampId;

  const bootcamp = await Bootcamp.findById(req.params.bootcampId);

  if (!bootcamp) {
    return next(new ErrorResponse(`No bootcamp with the id of ${req.params.bootcampId}`, 404));
  }

  const course = await Course.create(req.body);

  res.status(200).json({
    success: true,
    data: course
  });
});

/** 
 * @description   Update course
 * @method        PUT 
 * @route         /api/v1/courses/:id
 * @access        Private
*/
exports.updateCourse = asyncHandler( async (req, res, next) => {
  let course = await Course.findById(req.params.id);

  if (!course) {
    return next(new ErrorResponse(`No course with the id of ${req.params.id}`, 404));
  }

  course = await Course.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  })

  res.status(200).json({
    success: true,
    data: course
  });
});

/** 
 * @description   Delete course
 * @method        DELETE 
 * @route         /api/v1/courses/:id
 * @access        Private
*/
exports.deleteCourse = asyncHandler( async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(
      new ErrorResponse(`No course with the id of ${req.params.id}`, 404)
    );
  }

  await course.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
});
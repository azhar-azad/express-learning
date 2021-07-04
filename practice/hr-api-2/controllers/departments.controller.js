const Department = require('../models/Department');
const asyncHandler = require('../middlewares/asyncHandler.mw');
const ErrorResponse = require('../middlewares/error.mw');

/** 
 * @description   Create new department
 * @method        POST 
 * @route         /api/v1/departments
 * @access        Private
*/
exports.createDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      data: department
    });
});

/**
 * @description Get all departments
 * @method      GET
 * @route       /api/v1/departments
 * @access      Public
 */
 exports.getDepartments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @description Get single department
 * @method      GET
 * @route       /api/v1/departments/:id
 * @access      Public
 */
 exports.getDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.findById(req.params.id);

  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({
      success: true,
      data: department
    });
});

/**
 * @description Update department
 * @method      PUT
 * @route       /api/v1/departments/:id
 * @access      Private
 */
 exports.updateDepartment = asyncHandler(async (req, res, next) => {
  const department = await Department.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({
      success: true,
      data: department
    });
});

/**
 * @description Delete department
 * @method      DELETE
 * @route       /api/v1/departments/:id
 * @access      Private
 */
 exports.deleteDepartment = asyncHandler(async (req, res, next) => {
  // findByIdAndRemove method will not trigger mongoose middleware.
  const department = await Department.findById(req.params.id);

  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.id}`, 404)
    );
  }

  department.remove(); // remove method will trigger mongoose middleware

  res
    .status(200)
    .json({
      success: true,
      data: {}
    });
});
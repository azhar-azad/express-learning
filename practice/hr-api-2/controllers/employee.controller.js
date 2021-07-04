const asyncHandler = require('../middlewares/asyncHandler.mw');
const Employee = require('../models/Employee');
const ErrorResponse = require('../middlewares/error.mw');

/**
 * @description Crerate a new employee
 * @method      POST
 * @route       /api/v1/employees
 * @access      Private
 */
exports.createEmployee = asyncHandler(async(req, res, next) => {
  const employee = await Employee.create(req.body);

  res
    .status(201)
    .json({
      success: true,
      data: employee
    });
});

/**
 * @description Get all employees
 * @method      GET
 * @route       /api/v1/employees
 * @access      Public
 */
exports.getEmployees = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

/**
 * @description Get single employee
 * @method      GET
 * @route       /api/v1/employees/:id
 * @access      Public
 */
 exports.getEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({
      success: true,
      data: employee
    });
});

/**
 * @description Update employee
 * @method      PUT
 * @route       /api/v1/employees/:id
 * @access      Private
 */
 exports.updateEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  res
    .status(200)
    .json({
      success: true,
      data: employee
    });
});

/**
 * @description Delete employee
 * @method      DELETE
 * @route       /api/v1/employees/:id
 * @access      Private
 */
 exports.deleteEmployee = asyncHandler(async (req, res, next) => {
  // findByIdAndRemove method will not trigger mongoose middleware.
  const employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  employee.remove(); // remove method will trigger mongoose middleware

  res
    .status(200)
    .json({
      success: true,
      data: {}
    });
});
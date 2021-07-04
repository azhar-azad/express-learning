const asyncHandler = require('../middlewares/asyncHandler.mw');
const Employee = require('../models/Employee');
const Department = require('../models/Department');
const ErrorResponse = require('../middlewares/error.mw');

/**
 * @description Crerate a new employee
 * @method      POST
 * @route       /api/v1/departments/:departmentId/employees
 * @access      Private
 */
exports.createEmployee = asyncHandler(async(req, res, next) => {
  req.body.department = req.params.departmentId;

  const department = await Department.findById(req.params.departmentId);

  if (!department) {
    return next(
      new ErrorResponse(`Department not found with id of ${req.params.departmentId}`, 404)
    );
  }

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
 * @route       /api/v1/departments/:departmentId/employees
 * @access      Public
 */
exports.getEmployees = asyncHandler(async (req, res, next) => {
  if (req.params.departmentId) {
    // /api/v1/departments/:departmentId/employees

    const employees = await Employee.find({ department: req.params.departmentId });

    return res
      .status(200)
      .json({
        success: true,
        count: employees.length,
        data: employees
      });
  } else {
    // /api/v1/employees

    res.status(200).json(res.advancedResults);
  }
});

/**
 * @description Get single employee
 * @method      GET
 * @route       /api/v1/employees/:id
 * @access      Public
 */
 exports.getEmployee = asyncHandler(async (req, res, next) => {
  const employee = await Employee.findById(req.params.id).populate('department');

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
  let employee = await Employee.findById(req.params.id);

  if (!employee) {
    return next(
      new ErrorResponse(`Employee not found with id of ${req.params.id}`, 404)
    );
  }

  employee = await Employee.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

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

  await employee.remove(); // remove method will trigger mongoose middleware

  res
    .status(200)
    .json({
      success: true,
      data: {}
    });
});
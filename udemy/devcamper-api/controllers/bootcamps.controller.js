const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.middleware');
const geocoder = require('../utils/geocoder');

/** 
 * @description   Get all bootcamps
 * @method        GET 
 * @route         /api/v1/bootcamps
 * @access        Public
*/
exports.getBootcamps = asyncHandler( async (req, res, next) => {
  let query;
  
  // Copy req.query
  const reqQuery = { ...req.query };

  // Fields to exclude
  const removeFields = ['select', 'sort'];

  // Loop over removeFields and delete them from request query
  removeFields.forEach(param => delete reqQuery[param]);

  // Create query string
  let queryStr = JSON.stringify(reqQuery);

  // Create operators ($gt, $gte, etc)
  queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);

  // Finding resource
  query = Bootcamp.find(JSON.parse(queryStr));

  // Select Fields
  if (req.query.select) {
    const fields = req.query.select.split(',').join(' ');
    query = query.select(fields); // select is mongoose method to select selective fields
  }

  // Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.split(',').join(' ');
    query = query.sort(sortBy);
  } else {
    // Default = sort by date
    query = query.sort('-createdAt');
  }

  // Executing query
  const bootcamps = await query;

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});

/** 
 * @description   Get single bootcamp
 * @method        GET 
 * @route         /api/v1/bootcamps/:id
 * @access        Public
*/
exports.getBootcamp = asyncHandler( async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);

  if (!bootcamp) {
    // Formatted ObjectID but not found in DB
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

/** 
 * @description   Create new bootcamp
 * @method        POST 
 * @route         /api/v1/bootcamps
 * @access        Private
*/
exports.createBootcamp = asyncHandler( async (req, res, next) => {
  const bootcamp = await Bootcamp.create(req.body);

  res.status(201).json({
    success: true,
    data: bootcamp
  });
});

/** 
 * @description   Update bootcamp
 * @method        PUT 
 * @route         /api/v1/bootcamps/:id
 * @access        Private
*/
exports.updateBootcamp = asyncHandler( async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndUpdate(req.params.id, req.body, { 
    new: true,
    runValidators: true
  });

  if (!bootcamp) {
    new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  }

  res.status(200).json({
    success: true,
    data: bootcamp
  });
});

/** 
 * @description   Delete bootcamp
 * @method        DELETE 
 * @route         /api/v1/bootcamps/:id
 * @access        Private
*/
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
  const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
  
  if (!bootcamp) {
    new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
  }

  res.status(200).json({
    success: true,
    data: {} // means it is deleted
  });
});

/** 
 * @description   Get bootcamps within a radius
 * @method        GET 
 * @route         /api/v1/bootcamps/radius/:zipcode/:distance/
 * @access        Private
*/
exports.getBootcampsInRadius = asyncHandler( async (req, res, next) => {
  const { zipcode, distance } = req.params;

  // Get lat/lng from geocoder
  const loc = await geocoder.geocode(zipcode);
  const lat = loc[0].latitude;
  const lng = loc[0].longitude;

  // Calculate radius using radians(unit of measurment of radius)
  // Divide distance by radius of Earth
  // Earth Radius = 3,963 mi / 6,3778 km
  const radius = distance / 3963;

  const bootcamps = await Bootcamp.find({
    location: { $geoWithin: { $centerSphere: [ [ lng, lat ], radius ] } }
  });

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    data: bootcamps
  });
});
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

  // Fields to exclude (does not search for those while filtering, though they are present in req.query)
  const removeParams = ['select', 'sort', 'page', 'limit'];
  // Loop over removeFields and delete them from request query
  removeParams.forEach(param => delete reqQuery[param]);

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

  // Pagination
  const page = parseInt(req.query.page, 10) || 1; // to show certain page. If limit is 2 then, first 2 items make page 1, second 2 will make page 2 and so on
  const limit = parseInt(req.query.limit, 10) || 25; // 25 as 25 results will be returns as defualt
  const startIndex = (page - 1) * limit; 
  const endIndex = page * limit; 
  const total = await Bootcamp.countDocuments(); // total is the all the bootcamps in the db

  query = query.skip(startIndex).limit(limit);

  // Executing query
  const bootcamps = await query;

  // Pagination result
  const pagination = {};

  // Only show next page number if available
  if (endIndex < total) {
    pagination.next = {
      page: page + 1,
      limit
    }
  }

  // Only show previous page number if available
  if (startIndex > 0) {
    pagination.prev = {
      page: page - 1,
      limit
    }
  }

  res.status(200).json({
    success: true,
    count: bootcamps.length,
    pagination,
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
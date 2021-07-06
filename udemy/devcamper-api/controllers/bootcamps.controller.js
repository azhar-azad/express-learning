const Bootcamp = require('../models/Bootcamp');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middlewares/async.middleware');
const geocoder = require('../utils/geocoder');
const path = require('path');

/** 
 * @description   Get all bootcamps
 * @method        GET 
 * @route         /api/v1/bootcamps
 * @access        Public
*/
exports.getBootcamps = asyncHandler( async (req, res, next) => {
  res.status(200).json(res.advancedResults);
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
  // Add user to req.body
  req.body.user = req.user.id; // this is the logged in user id

  // Check for published bootcamp
  // Finding all bootcamps by a user
  const publishedBootcamp = await Bootcamp.findOne({ user: req.user.id });

  // If the user is not an admin, they can only add one bootcamp
  if (publishedBootcamp && req.user.role !== 'admin') {
    return next(
      new ErrorResponse(`The user with ID ${req.user.id} has already published a bootcamp`, 400)
    );
  }

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
 * @description   Delete bootcamp
 * @method        DELETE 
 * @route         /api/v1/bootcamps/:id
 * @access        Private
*/
exports.deleteBootcamp = asyncHandler( async (req, res, next) => {
  // findByIdAndRemove method will not trigger mongoose middleware.
  // const bootcamp = await Bootcamp.findByIdAndRemove(req.params.id);
  const bootcamp = await Bootcamp.findById(req.params.id);
  
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  bootcamp.remove(); // remove method will trigger mongoose middleware

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

/** 
 * @description   Upload photo for bootcamp
 * @method        PUT 
 * @route         /api/v1/bootcamps/:id/photo
 * @access        Private
*/
exports.bootcampPhotoUpload = asyncHandler( async (req, res, next) => {
  const bootcamp = await Bootcamp.findById(req.params.id);
  
  if (!bootcamp) {
    return next(
      new ErrorResponse(`Bootcamp not found with id of ${req.params.id}`, 404)
    );
  }

  if (!req.files) {
    return next(
      new ErrorResponse(`Please upload a file`, 400)
    );
  }

  const file = req.files.file;

  // Make sure the upload is a photo
  if (!file.mimetype.startsWith('image')) {
    return next(
      new ErrorResponse(`Please upload an image file`, 400)
    );
  }

  // Check file size
  if (file.size > process.env.MAX_FILE_UPLOAD) {
    return next(
      new ErrorResponse(`Please upload an image less than ${process.env.MAX_FILE_UPLOAD}`, 400)
    );
  }

  // Create custom filename
  file.name = `photo_${bootcamp._id}${path.parse(file.name).ext}`;
  
  file.mv(`${process.env.FILE_UPLOAD_PATH}/${file.name}`, async err => {
    if (err) {
      console.error(err);
      return next(
        new ErrorResponse(`Problem with file upload`, 500)
      );
    }

    await Bootcamp.findByIdAndUpdate(req.params.id, { photo: file.name });

    res.status(200).json({
      success: true,
      data: file.name
    });
  })
});
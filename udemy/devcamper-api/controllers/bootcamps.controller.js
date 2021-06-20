const Bootcamp = require('../models/Bootcamp');

/** 
 * @description   Get all bootcamps
 * @method        GET 
 * @route         /api/v1/bootcamps
 * @access        Public
*/
exports.getBootcamps = (req, res, next) => {
  res.status(200).json({ 
    success: true, 
    msg: `Show all bootcamps`
  });
};

/** 
 * @description   Get single bootcamp
 * @method        GET 
 * @route         /api/v1/bootcamps/:id
 * @access        Public
*/
exports.getBootcamp = (req, res, next) => {
  res.status(200).json({ 
    success: true, 
    msg: `Get bootcamp ${req.params.id}`
  });
};

/** 
 * @description   Create new bootcamp
 * @method        POST 
 * @route         /api/v1/bootcamps
 * @access        Private
*/
exports.createBootcamp = async (req, res, next) => {
  try {
    const bootcamp = await Bootcamp.create(req.body);

    res.status(201).json({
      success: true,
      data: bootcamp
    });
  } catch (err) {
    res.status(400).json({
      success: false,
      error: err
    });
  }
};

/** 
 * @description   Update bootcamp
 * @method        PUT 
 * @route         /api/v1/bootcamps/:id
 * @access        Private
*/
exports.updateBootcamp = (req, res, next) => {
  res.status(200).json({ 
    success: true, 
    msg: `Update bootcamp ${req.params.id}`
  });
};

/** 
 * @description   Delete bootcamp
 * @method        DELETE 
 * @route         /api/v1/bootcamps/:id
 * @access        Private
*/
exports.deleteBootcamp = (req, res, next) => {
  res.status(200).json({ 
    success: true, 
    msg: `Delete bootcamp ${req.params.id}`
  });
};
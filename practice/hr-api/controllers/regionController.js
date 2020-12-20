const Region = require('../models/Region.js');

const createRegion = async (req, res) => {
  try {
    const region = new Region(req.body);
    await region.save();
    sendData(res, 201, region);
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    sendData(res, 200, regions);
  } catch (e) {
    sendError(res, 500, e);
  }
};

// PRIVATE METHODS ONLY FOR THIS MODULE
const sendData = (res, statusCode, data) => {
  res.status(statusCode).json({
    success: true,
    data: data
  });
};

const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  createRegion,
  getRegions
};
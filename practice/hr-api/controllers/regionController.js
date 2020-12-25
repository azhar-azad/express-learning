const Region = require('../models/Region.js');

const { sendData, sendError } = require('./messageController.js');

// No Dependency

const createRegion = async (req, res) => {
  try {
    const region = new Region(req.body);
    
    const region2 = Region.findOne({ regionName: region.regionName });
    
    if (region2 !== null) {
      sendError(res, 400, 'Region exists.');
    }
    else {
      await region.save();
      sendData(res, 201, region);
    }
    
  } catch (e) {
    sendError(res, 400, e.message);
  }
};

const getRegions = async (req, res) => {
  try {
    const regions = await Region.find();
    sendData(res, 200, regions);
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const getRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (region === null) {
      sendError(res, 404, 'Region is not found');
      return;
    }
    
    sendData(res, 200, region);
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const updateRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (region === null) {
      sendError(res, 404, 'Region is not found');
      return;
    }
    
    const { regionName } = req.body;
    if (regionName)
      region.regionName = regionName;
    await region.save();
    
    sendData(res, 200, region);
  } catch (e) {
    sendError(res, 500, e.message)
  }
};

const deleteRegion = async (req, res) => {
  try {
    const region = await Region.findById(req.params.id);
    if (region === null) {
      sendError(res, 404, 'Region is not found');
      return;
    }
    
    await region.remove();
    sendData(res, 200, 'Region Deleted: ' + region.regionName);
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

module.exports = {
  createRegion,
  getRegions,
  getRegion,
  updateRegion,
  deleteRegion
};
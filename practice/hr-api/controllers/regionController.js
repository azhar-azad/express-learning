const Region = require('../models/Region.js');

const { sendData, sendError } = require('./messageController.js');

// No Dependency

const createRegion = async (req, res) => {
  
  let region = null;
  try {
    region = new Region(req.body);
    
    await region.save();
    sendData(res, 201, region);
    
  } catch (e) {
    if (e.message.includes('E11000'))
      sendError(res, 400, `${region.regionName} exists.`);
    else
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
  
  let region = null;
  try {
    region = await Region.findById(req.params.id);
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
    if (e.message.includes('E11000'))
      sendError(res, 400, `${region.regionName} exists.`);
    else
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
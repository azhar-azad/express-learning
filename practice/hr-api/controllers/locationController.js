const Location = require('../models/Location.js');
const Country = require('../models/Country.js');

const { sendData, sendError } = require('./messageController.js');

// Location has dependency on Country
// Save the Country first before saving Location

const createLocation = async (req, res) => {
  
  let location = null;
  try {
    location = new Location(req.body);
    
    const country = await Country.findById({ _id: location.country });
    if (country === null) {
      sendError(res, 400, 'Country is not found. Save the country first.');
    }
    else {
      await location.save();
      
      country.locations.push(location);
      await country.save();
  
      sendData(res, 201, location);
    }
    
  } catch (e) {
    sendError(res, 400, e.message);
  }
};

const getLocations = async (req, res) => {
  try {
    const locations = await Location.find();
    sendData(res, 200, locations);
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const getLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (location === null) {
      sendError(res, 404, 'Location is not found');
      return;
    }
    
    sendData(res, 200, location);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const updateLocation = async (req, res) => {
  let location = null;
  try {
    location = await Location.findById(req.params.id);
    if (location === null) {
      sendError(res, 404, 'Location is not found');
      return;
    }
    
    const { streetAddress, postalCode, city } = req.body;
    if (streetAddress)
      location.streetAddress = streetAddress;
    if (postalCode)
      location.postalCode = postalCode;
    if (city)
      location.city = city;
    
    await location.save();
    
    sendData(res, 200, location);
    
  } catch (e) {
    sendError(res, 500, e.message)
  }
};

const deleteLocation = async (req, res) => {
  try {
    const location = await Location.findById(req.params.id);
    if (location === null) {
      sendError(res, 404, 'Location is not found');
      return;
    }
    
    await location.remove();
    
    sendData(res, 200, 'Location Deleted: ' + location._id);
    
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

module.exports = {
  createLocation,
  getLocations,
  getLocation,
  updateLocation,
  deleteLocation
};
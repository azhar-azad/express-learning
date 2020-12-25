const Location = require('../models/Location.js');
const Country = require('../models/Country.js');

const { sendData, sendError } = require('./messageController.js');

// Location has dependency on Country
// Save the Country first before saving Location

const createLocation = async (req, res) => {
  try {
    const location = new Location(req.body);
    
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

// PRIVATE METHODS ONLY FOR THIS MODULE
// const sendData = (res, statusCode, data) => {
//   res.status(statusCode).json({
//     success: true,
//     data: data
//   });
// };
//
// const sendError = (res, statusCode, error) => {
//   res.status(statusCode).json({
//     success: false,
//     message: error.message
//   });
// };

module.exports = {
  createLocation,
  getLocations
};
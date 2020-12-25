const Country = require('../models/Country.js');
const Region = require('../models/Region.js');

const { sendData, sendError } = require('./messageController.js');

// Country has dependency on Region
// Save the Region first before saving Country

const createCountry = async (req, res) => {
  try {
    const country = new Country(req.body);
    
    const region = await Region.findById({ _id: country.region });
    if (region === null) {
      sendError(res, 400, 'Region is not found. Save the region first.');
    }
    else {
      await country.save();
  
      region.countries.push(country);
      await region.save();
  
      sendData(res, 201, country);
    }
  } catch (e) {
    sendError(res, 400, e.message);
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    sendData(res, 200, countries);
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const getCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country === null) {
      sendError(res, 404, 'Country is not found');
      return;
    }
    
    sendData(res, 200, country);
  } catch (e) {
    sendError(res, 500, e.message);
  }
};

const updateCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country === null) {
      sendError(res, 404, 'Country is not found');
      return;
    }
    
    const { countryName } = req.body;
    if (countryName)
      country.countryName = countryName;
    await country.save();
    
    sendData(res, 200, country);
  } catch (e) {
    sendError(res, 500, e.message)
  }
};

const deleteCountry = async (req, res) => {
  try {
    const country = await Country.findById(req.params.id);
    if (country === null) {
      sendError(res, 404, 'Country is not found');
      return;
    }
    
    await country.remove();
    sendData(res, 200, 'Country Deleted: ' + country.countryName);
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
// const sendError = (res, statusCode, message) => {
//   res.status(statusCode).json({
//     success: false,
//     message: message
//   });
// };

module.exports = {
  createCountry,
  getCountries,
  getCountry,
  updateCountry,
  deleteCountry
};
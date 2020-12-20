const Country = require('../models/Country.js');
const Region = require('../models/Region.js');

const createCountry = async (req, res) => {
  try {
    const country = new Country(req.body);
    await country.save();
    
    const region = await Region.findById({ _id: country.region });
    region.countries.push(country);
    await region.save();
    
    sendData(res, 201, country);
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getCountries = async (req, res) => {
  try {
    const countries = await Country.find();
    sendData(res, 200, countries);
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
  createCountry,
  getCountries
};
const Publisher = require('../models/publisher.js');

const createPublisher = async (req, res) => {
  try {
    const publisher = new Publisher(req.body);
    await publisher.save();
    res.status(201).json({
      success: true,
      data: publisher
    });
  } catch (e) {
    sendError(res, 400, e);
  }
};

const getPublishers = async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json({
      success: true,
      data: publishers
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const getPublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (publisher === null) {
      sendError(res, 404, 'Publisher is not found');
      return;
    }
    res.json({
      success: true,
      data: publisher
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const updatePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (publisher === null) {
      sendError(res, 404, 'Publisher is not found');
      return;
    }
    const { name, location } = req.body;
    
    if (name) publisher.name = name;
    if (location) publisher.location = location;
    
    await publisher.save();
    res.json({
      success: true,
      data: publisher
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

const deletePublisher = async (req, res) => {
  try {
    const publisher = await Publisher.findById(req.params.id);
    if (publisher === null) {
      sendError(res, 404, 'Publisher is not found');
      return;
    }
    await publisher.remove();
    res.json({
      success: true,
      data: `Publisher Deleted: ${publisher.name}`
    });
  } catch (e) {
    sendError(res, 500, e);
  }
};

// PRIVATE METHODS ONLY FOR THIS MODULE
const sendError = (res, statusCode, error) => {
  res.status(statusCode).json({
    success: false,
    message: error.message
  });
};

module.exports = {
  createPublisher,
  getPublishers,
  getPublisher,
  updatePublisher,
  deletePublisher
};
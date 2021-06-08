const mongoose = require('mongoose');
const Organization = require('../models/organization');
const Usr = require('../models/usr');

const validateRequest = async (req, res) => {

  // org_id validation
  if (req.body.org_id) {
    if (!mongoose.isValidObjectId(req.body.org_id)) {
      res.status(400).send('Invalid Organization id');
    }

    try {
      const org = await Organization.findById(req.body.org_id);
      if (!org)
        throw new Error();
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No Organization found with id: ${req.body.org_id}`
      });
    }
  }
  // org_id validation - end

  // usr_id validation
  if (req.body.usr_id) {
    if (!mongoose.isValidObjectId(req.body.usr_id)) {
      res.status(400).send('Invalid Usr id');
    }

    try {
      const usr = await Usr.findById(req.body.usr_id);
      if (!usr)
        throw new Error();
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No Usr found with id: ${req.body.usr_id}`
      });
    }
  }
  // usr_id validation - end
}

module.exports = {
  validateRequest
}
const mongoose = require('mongoose');
const UsrMapping = require('../models/usrMapping');
const Organization = require('../models/organization');
const Usr = require('../models/usr');
const { getOrgIdsByOrgNames } = require('../helpers/helpers');

/**
 * @Dependencies: Organization, Usr
 * */

const createUsrMapping = async (req, res) => {
  console.log(':::::[createUsrMappingApi]:::::');

  let isValid = true;

  // org_id validation
  if (req.body.org_id) {
    if (!mongoose.isValidObjectId(req.body.org_id)) {
      isValid = false;
      res.status(400).send('Invalid Organization id');
    }

    try {
      const org = await Organization.findById(req.body.org_id);
      console.log('org ==> ' + org);
      if (!org) {
        throw new Error();
      }
    } catch(err) {
      isValid = false;
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
      isValid = false;
      res.status(400).send('Invalid Usr id');
    }

    try {
      const usr = await Usr.findById(req.body.usr_id);
      if (!usr) {
        throw new Error();
      }
    } catch(err) {
      isValid = false;
      res.status(400).json({
        success: false,
        message: `No Usr found with id: ${req.body.usr_id}`
      });
    }
  }
  // usr_id validation - end

  if (isValid) {
    const usrMappingData = new UsrMapping({
      cif_num: req.body.cif_num,
      org_id: req.body.org_id,
      usr_id: req.body.usr_id
    });

    usrMappingData.save()
      .then(usrMapping => res.status(201).json(usrMapping))
      .catch(err => res.status(500).json({
        error: err,
        success: false,
        message: `Failed to create UsrMapping`
      }));
  }
};

const getUsrMappings = async (req, res) => {
  console.log(':::::[getUsrMappingsApi]:::::');

  let filters = {};
  if (req.query.cifNums)
    filters.cif_num = req.query.cifNums.split(',');
  if (req.query.usrIds)
    filters.usr_id = req.query.usrIds.split(',');
  if (req.query.orgNames)
    filters.org_id = await getOrgIdsByOrgNames(req.query.orgNames.split(','));

  let usr = req.query.usr;
  let org = req.query.org;

  if (usr) {
    if (usr === 'no' || usr === 'n' ||
      usr === 'NO' || usr === 'N')
      usr = null;
  }
  if (org) {
    if (org === 'no' || org === 'n' ||
      org === 'NO' || org === 'N')
      org = null;
  }

  UsrMapping.find(filters)
    .populate(org ? 'org_id' : null)
    .populate(usr ? 'usr_id' : null)
    .then(usrMappings => res.status(200).json(usrMappings))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch UsrMapping data`
    }));
};

const getUsrMapping = (req, res) => {
  console.log(':::::[getUsrMappingApi]:::::');

  UsrMapping.findById(req.params.id)
    .populate('org_id')
    .populate('usr_id')
    .then(usrMapping => res.status(200).json(usrMapping))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch UsrMapping with id: ${req.params.id}`
    }));
};

const updateUsrMapping = async (req, res) => {
  console.log(':::::[updateUsrMappingApi]:::::');

  let isValid = true;

  // org_id validation
  if (req.body.org_id) {
    if (!mongoose.isValidObjectId(req.body.org_id)) {
      isValid = false;
      res.status(400).send('Invalid Organization id');
    }

    try {
      const org = await Organization.findById(req.body.org_id);
      console.log('org ==> ' + org);
      if (!org) {
        throw new Error();
      }
    } catch(err) {
      isValid = false;
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
      isValid = false;
      res.status(400).send('Invalid Usr id');
    }

    try {
      const usr = await Usr.findById(req.body.usr_id);
      if (!usr) {
        throw new Error();
      }
    } catch(err) {
      isValid = false;
      res.status(400).json({
        success: false,
        message: `No Usr found with id: ${req.body.usr_id}`
      });
    }
  }
  // usr_id validation - end

  if (isValid) {
    const updatedUsrMappingData = {
      cif_num: req.body.cif_num,
      org_id: req.body.org_id,
      usr_id: req.body.usr_id
    };

    UsrMapping.findByIdAndUpdate(req.params.id, updatedUsrMappingData, {new: true})
      .then(updatedUsrMapping => res.json(updatedUsrMapping))
      .catch(err => res.status(400).json({
        error: err,
        success: false,
        message: `Failed to update UsrMapping with id: ${req.params.id}`
      }));
  }
};

const deleteUsrMapping = (req, res) => {
  console.log(':::::[deleteUsrMappingApi]:::::');

  UsrMapping.findByIdAndRemove(req.params.id)
    .then(deletedUsrMapping => {
      if (deletedUsrMapping)
        return res.status(200).json({success: true, message: 'UsrMapping is deleted'})
      else
        return res.status(404).json({success: false, message: 'UsrMapping not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted UsrMapping with id: ${req.params.id}`
    }));
};


module.exports = {
  createUsrMapping,
  getUsrMappings,
  getUsrMapping,
  updateUsrMapping,
  deleteUsrMapping
};


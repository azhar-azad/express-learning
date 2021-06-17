const mongoose = require('mongoose');
const Organization = require('../models/organization');

/**
 * @Dependency: No dependency
 * */

const createOrganization = (req, res) => {
  console.log(':::::[createOrganization]:::::');

  const orgData = new Organization({
    org_uniquename: req.body.org_uniquename,
    org_displayname: req.body.org_displayname,
    schema_name: req.body.schema_name
  });

  orgData.save()
    .then(org => res.status(201).json(org))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create Organization`
    }));
};

const getOrganizations = (req, res) => {
  console.log(':::::[getOrganizationsApi]:::::');

  let filters = {};
  if (req.query.orgNames)
    filters.org_uniquename = req.query.orgNames.split(',');

  Organization.find(filters)
    // .sort({'org_uniquename': -1}) // sort by column
    .then(orgs => res.status(200).json(orgs))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch Organization data`
    }));
};

const getOrganization = (req, res) => {
  console.log(':::::[getOrganizationApi]:::::');

  Organization.findById(req.params.id)
    .then(org => res.status(200).json(org))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch Organization with id: ${req.params.id}`
    }));
};

const updateOrganization = (req, res) => {
  console.log(':::::[updateOrganizationApi]:::::');

  if (!mongoose.isValidObjectId(req.params.id)) { // validating id
    res.status(400).send('Invalid Organization id');
  }

  const updatedOrgData = {
    org_uniquename: req.body.org_uniquename,
    org_displayname: req.body.org_displayname,
    schema_name: req.body.schema_name
  };

  Organization.findByIdAndUpdate(req.params.id, updatedOrgData, {new: true})
    .then(updatedOrg => res.json(updatedOrg))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update Organization with id: ${req.params.id}`
    }));
};

const deleteOrganization = (req, res) => {
  console.log(':::::[deleteOrganizationApi]:::::');

  Organization.findByIdAndRemove(req.params.id)
    .then(deletedOrg => {
      if (deletedOrg)
        return res.status(200).json({success: true, message: 'Organization is deleted'})
      else
        return res.status(404).json({success: false, message: 'Organization not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted Organization with id: ${req.params.id}`
    }));
};

module.exports = {
  createOrganization,
  getOrganizations,
  getOrganization,
  updateOrganization,
  deleteOrganization
};
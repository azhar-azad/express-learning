const UsrSession = require('../models/usrSession');
const mongoose = require('mongoose');
const Organization = require('../models/organization');
const Usr = require('../models/usr');

/**
 * @Dependencies: Organization, Usr
 * */

const createUsrSession = async (req, res) => {
  console.log(':::::[createUsrSessionApi]:::::');

  let isValid = true;

  // org_id validation
  if (req.body.org_id) {
    if (!mongoose.isValidObjectId(req.body.org_id)) {
      res.status(400).send('Invalid Organization id');
    }

    try {
      const org = await Organization.findById(req.body.org_id);
      console.log('org ==> ' + org);
      if (!org) {
        throw new Error();
      }
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
      if (!usr) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No Usr found with id: ${req.body.usr_id}`
      });
    }
  }
  // usr_id validation - end

  if (isValid) {
    const usrSessionData = new UsrSession({
      sess_login_id: req.body.sess_login_id,
      ses_active_status: req.body.ses_active_status,
      sso_key: req.body.sso_key,
      org_id: req.body.org_id,
      usr_id: req.body.usr_id
    });

    usrSessionData.save()
      .then(usrSession => res.status(201).json(usrSession))
      .catch(err => res.status(500).json({
        error: err,
        success: false,
        message: `Failed to create UsrSession`
      }));
  }
};

const getUsrSessions = (req, res) => {
  console.log(':::::[getUsrSessionsApi]:::::');

  let filter = {};
  if (req.query.sessLoginIds) filter.sess_login_id = req.query.sessLoginIds.split(',');
  if (req.query.ssoKeys) filter.sso_key = req.query.ssoKeys.split(',');
  if (req.query.usrIds) filter.usr_id = req.query.usrIds.split(',');
  if (req.query.orgIds) filter.org_id = req.query.orgIds.split(',');

  UsrSession.find(filter)
    .then(usrMappings => res.status(200).json(usrMappings))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch UsrSession data`
    }));
};

const getUsrSession = (req, res) => {
  console.log(':::::[getUsrSessionApi]:::::');

  UsrSession.findById(req.params.id)
    .populate('org_id')
    .populate('usr_id')
    .then(usrSession => res.status(200).json(usrSession))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch UsrSession with id: ${req.params.id}`
    }));
};

const updateUsrSession = async (req, res) => {
  console.log(':::::[updateUsrSessionApi]:::::');

  let isValid = true;

  // org_id validation
  if (req.body.org_id) {
    if (!mongoose.isValidObjectId(req.body.org_id)) {
      res.status(400).send('Invalid Organization id');
    }

    try {
      const org = await Organization.findById(req.body.org_id);
      console.log('org ==> ' + org);
      if (!org) {
        throw new Error();
      }
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
      if (!usr) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No Usr found with id: ${req.body.usr_id}`
      });
    }
  }
  // usr_id validation - end

  if (isValid) {
    const updatedUsrSessionData = {
      sess_login_id: req.body.sess_login_id,
      ses_active_status: req.body.ses_active_status,
      sso_key: req.body.sso_key,
      org_id: req.body.org_id,
      usr_id: req.body.usr_id
    };

    UsrSession.findByIdAndUpdate(req.params.id, updatedUsrSessionData, {new: true})
      .then(updatedUsrSession => res.json(updatedUsrSession))
      .catch(err => res.status(400).json({
        error: err,
        success: false,
        message: `Failed to update UsrSession with id: ${req.params.id}`
      }));
  }
};

const deleteUsrSession = (req, res) => {
  console.log(':::::[deleteUsrSessionApi]:::::');

  UsrSession.findByIdAndRemove(req.params.id)
    .then(deletedUsrSession => {
      if (deletedUsrSession)
        return res.status(200).json({success: true, message: 'UsrSession is deleted'})
      else
        return res.status(404).json({success: false, message: 'UsrSession not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted UsrSession with id: ${req.params.id}`
    }));
};

module.exports = {
  createUsrSession,
  getUsrSessions,
  getUsrSession,
  updateUsrSession,
  deleteUsrSession
};


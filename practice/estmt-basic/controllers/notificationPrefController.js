const mongoose = require('mongoose');
const NotificationPreference = require('../models/notificationPreference');
const Usr = require('../models/usr');
const FinAccount = require('../models/finAccount');
const UsrFinAccount = require('../models/usrFinAccount');

const { getAcctIdsByAcctNums } = require('../helpers/helpers');

/**
 * @Dependency: Usr, FinAccount, UsrFinAccount
 * */

const createNotificationPreference = async (req, res) => {
  console.log(':::::[createNotificationPreferenceApi]:::::');

  // usr validation
  if (req.body.usr_id && req.body.usr_id !== '') {
    if (!mongoose.isValidObjectId(req.body.usr_id)) {
      res.status(400).send('Invalid Usr id');
      return;
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
      return;
    }
  }
  // usr validation - end

  // fin_account validation
  if (req.body.acct_id && req.body.acct_id !== '') {
    if (!mongoose.isValidObjectId(req.body.acct_id)) {
      res.status(400).send('Invalid FinAccount id');
      return;
    }

    try {
      const acct = await FinAccount.findById(req.body.acct_id);
      if (!acct) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No FinAccount found with id: ${req.body.acct_id}`
      });
      return;
    }
  }
  // fin_account validation - end

  // usr_fin_account validation
  if (req.body.ufa_id && req.body.ufa_id !== '') {
    if (!mongoose.isValidObjectId(req.body.ufa_id)) {
      res.status(400).send('Invalid UsrFinAccount id');
      return;
    }

    try {
      const ufa = await UsrFinAccount.findById(req.body.ufa_id);
      if (!ufa) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No UsrFinAccount found with id: ${req.body.ufa_id}`
      });
      return;
    }
  }
  // usr_fin_account validation - end

  const notificationPrefData = new NotificationPreference({
    email_address: req.body.email_address,
    sms_number: req.body.sms_number,
    email_status: req.body.email_status,
    sms_status: req.body.sms_status,
    stmt_type: req.body.stmt_type,
    usr_id: req.body.usr_id,
    acct_id: req.body.acct_id,
    ufa_id: req.body.ufa_id
  });

  notificationPrefData.save()
    .then(notificationPref => res.status(201).json(notificationPref))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create NotificationPreference`
    }));
};

const getNotificationPreferences = async (req, res) => {
  console.log(':::::[getNotificationPreferencesApi]:::::');

  let filters = {};
  if (req.query.usrs)
    filters.usr_id = req.query.usrs.split(',');
  if (req.query.accts)
    filters.acct_id = req.query.accts.split(',');
  if (req.query.ufas)
    filters.ufa_id = req.query.ufas.split(',');
  if (req.query.emails)
    filters.email_address = req.query.emails.split(',');
  if (req.query.smss)
    filters.sms_number = req.query.smss.split(',');
  if (req.query.acctNums)
    filters.acct_id = await getAcctIdsByAcctNums(req.query.acctNums);

  let usr = req.query.usr;
  if (usr) {
    if (usr === 'no' || usr === 'n' || usr === 'NO' || usr === 'N')
      usr = null;
  }
  let acct = req.query.acct;
  if (acct) {
    if (acct === 'no' || acct === 'n' || acct === 'NO' || acct === 'N')
      acct = null;
  }
  let ufa = req.query.ufa;
  if (ufa) {
    if (ufa === 'no' || ufa === 'n' || ufa === 'NO' || ufa === 'N')
      ufa = null;
  }

  NotificationPreference.find(filters)
    .populate(usr ? 'usr_id' : null)
    .populate(acct ? 'acct_id' : null)
    .populate(ufa ? 'ufa_id' : null)
    .then(notificationPrefs => res.status(200).json(notificationPrefs))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch NotificationPreference data`
    }));
};

const getNotificationPreference = (req, res) => {
  console.log(':::::[getNotificationPreferenceApi]:::::');

  NotificationPreference.findById(req.params.id)
    .populate('usr_id')
    .populate('acct_id')
    .populate('ufa_id')
    .then(notificationPref => res.status(200).json(notificationPref))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch NotificationPreference with id: ${req.params.id}`
    }));
};

const updateNotificationPreference = async (req, res) => {
  console.log(':::::[updateNotificationPreferenceApi]:::::');

  // usr validation
  if (req.body.usr_id && req.body.usr_id !== '') {
    if (!mongoose.isValidObjectId(req.body.usr_id)) {
      res.status(400).send('Invalid Usr id');
      return;
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
      return;
    }
  }
  // usr validation - end

  // fin_account validation
  if (req.body.acct_id && req.body.acct_id !== '') {
    if (!mongoose.isValidObjectId(req.body.acct_id)) {
      res.status(400).send('Invalid FinAccount id');
      return;
    }

    try {
      const acct = await FinAccount.findById(req.body.acct_id);
      if (!acct) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No FinAccount found with id: ${req.body.acct_id}`
      });
      return;
    }
  }
  // fin_account validation - end

  // usr_fin_account validation
  if (req.body.ufa_id && req.body.ufa_id !== '') {
    if (!mongoose.isValidObjectId(req.body.ufa_id)) {
      res.status(400).send('Invalid UsrFinAccount id');
      return;
    }

    try {
      const ufa = await UsrFinAccount.findById(req.body.ufa_id);
      if (!ufa) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No UsrFinAccount found with id: ${req.body.ufa_id}`
      });
      return;
    }
  }
  // usr_fin_account validation - end

  const updatedNotificationPreferenceData = {
    email_address: req.body.email_address,
    sms_number: req.body.sms_number,
    email_status: req.body.email_status,
    sms_status: req.body.sms_status,
    stmt_type: req.body.stmt_type,
    usr_id: req.body.usr_id,
    acct_id: req.body.acct_id,
    ufa_id: req.body.ufa_id
  };

  NotificationPreference.findByIdAndUpdate(req.params.id, updatedNotificationPreferenceData, {new: true})
    .then(updatedNotificationPreference => res.json(updatedNotificationPreference))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update NotificationPreference with id: ${req.params.id}`
    }));
};

const deleteNotificationPreference = (req, res) => {
  console.log(':::::[deleteNotificationPreferenceApi]:::::');

  NotificationPreference.findByIdAndRemove(req.params.id)
    .then(deletedNotificationPreference => {
      if (deletedNotificationPreference)
        return res.status(200).json({success: true, message: 'NotificationPreference is deleted'})
      else
        return res.status(404).json({success: false, message: 'NotificationPreference not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted NotificationPreference with id: ${req.params.id}`
    }));
};

module.exports = {
  createNotificationPreference,
  getNotificationPreferences,
  getNotificationPreference,
  updateNotificationPreference,
  deleteNotificationPreference
};
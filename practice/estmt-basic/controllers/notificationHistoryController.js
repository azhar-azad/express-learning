const mongoose = require('mongoose');
const NotificationHistory = require('../models/notificationHistory');
const Usr = require('../models/usr');
const FinAccount = require('../models/finAccount');
const UsrFinAccount = require('../models/usrFinAccount');
const NotificationPreference = require('../models/notificationPreference');

const { getAcctIdsByAcctNums } = require('../helpers/helpers');

/**
 * @Dependency: Usr, FinAccount, UsrFinAccount, NotificationPreference
 * */

const createNotificationHistory = async (req, res) => {
  console.log(':::::[createNotificationHistoryApi]:::::');

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

  // notification_preference validation
  if (req.body.notification_preference_id && req.body.notification_preference_id !== '') {
    if (!mongoose.isValidObjectId(req.body.notification_preference_id)) {
      res.status(400).send('Invalid NotificationPreference id');
      return;
    }

    try {
      const notificationPref = await NotificationPreference.findById(req.body.notification_preference_id);
      if (!notificationPref) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No NotificationPreference found with id: ${req.body.notification_preference_id}`
      });
      return;
    }
  }
  // notification_preference validation - end

  const notificationHistoryData = new NotificationHistory({
    notification_preference_id: req.body.notification_preference_id,
    usr_id: req.body.usr_id,
    acct_id: req.body.acct_id,
    ufa_id: req.body.ufa_id
  });

  notificationHistoryData.save()
    .then(notificationHistory => res.status(201).json(notificationHistory))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create NotificationHistory`
    }));
};

const getNotificationHistories = async (req, res) => {
  console.log(':::::[getNotificationHistoriesApi]:::::');

  let filters = {};
  if (req.query.usrs)
    filters.usr_id = req.query.usrs.split(',');
  if (req.query.accts)
    filters.acct_id = req.query.accts.split(',');
  if (req.query.ufas)
    filters.ufa_id = req.query.ufas.split(',');
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
  let np = req.query.np;
  if (np) {
    if (np === 'no' || np === 'n' || np === 'NO' || np === 'N')
      np = null;
  }

  NotificationHistory.find(filters)
    .populate(usr ? 'usr_id' : null)
    .populate(acct ? 'acct_id' : null)
    .populate(ufa ? 'ufa_id' : null)
    .populate(np ? 'notification_preference_id' : null)
    .then(notificationHistories => res.status(200).json(notificationHistories))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch NotificationHistory data`
    }));
};

const getNotificationHistory = (req, res) => {
  console.log(':::::[getNotificationHistoryApi]:::::');

  NotificationHistory.findById(req.params.id)
    .populate('usr_id')
    .populate('acct_id')
    .populate('ufa_id')
    .populate('notification_preference_id')
    .then(notificationHistory => res.status(200).json(notificationHistory))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch NotificationHistory with id: ${req.params.id}`
    }));
};

const updateNotificationHistory = async (req, res) => {
  console.log(':::::[updateNotificationHistoryApi]:::::');

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

  // notification_preference validation
  if (req.body.notification_preference_id && req.body.notification_preference_id !== '') {
    if (!mongoose.isValidObjectId(req.body.notification_preference_id)) {
      res.status(400).send('Invalid NotificationPreference id');
      return;
    }

    try {
      const notificationPref = await NotificationPreference.findById(req.body.notification_preference_id);
      if (!notificationPref) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No NotificationPreference found with id: ${req.body.notification_preference_id}`
      });
      return;
    }
  }
  // notification_preference validation - end

  const updatedNotificationHistoryData = {
    notification_preference_id: req.body.notification_preference_id,
    usr_id: req.body.usr_id,
    acct_id: req.body.acct_id,
    ufa_id: req.body.ufa_id
  };

  NotificationHistory.findByIdAndUpdate(req.params.id, updatedNotificationHistoryData, {new: true})
    .then(updatedNotificationHistory => res.json(updatedNotificationHistory))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update NotificationHistory with id: ${req.params.id}`
    }));
};

const deleteNotificationHistory = (req, res) => {
  console.log(':::::[deleteNotificationHistoryApi]:::::');

  NotificationHistory.findByIdAndRemove(req.params.id)
    .then(deletedNotificationHistory => {
      if (deletedNotificationHistory)
        return res.status(200).json({success: true, message: 'NotificationHistory is deleted'})
      else
        return res.status(404).json({success: false, message: 'NotificationHistory not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted NotificationHistory with id: ${req.params.id}`
    }));
};

module.exports = {
  createNotificationHistory,
  getNotificationHistories,
  getNotificationHistory,
  updateNotificationHistory,
  deleteNotificationHistory
};
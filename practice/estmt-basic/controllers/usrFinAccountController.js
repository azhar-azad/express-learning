const UsrFinAccount = require('../models/usrFinAccount');
const mongoose = require('mongoose');
const FinAccount = require('../models/finAccount');
const Usr = require('../models/usr');

const { getAcctIdsByAcctNums } = require('../helpers/helpers');

/**
 * @Dependencies: Usr, FinAccount
 * */

const createUsrFinAccount = async (req, res) => {
  console.log(':::::[createUsrFinAccountApi]:::::');

  let isValid = true;

  // acct_id validation
  if (req.body.acct_id) {
    if (!mongoose.isValidObjectId(req.body.acct_id)) {
      isValid = false;
      res.status(400).send('Invalid FinAccount id');
    }

    try {
      const finAcct = await FinAccount.findById(req.body.acct_id);
      if (!finAcct) {
        throw new Error();
      }
    } catch(err) {
      isValid = false;
      res.status(400).json({
        success: false,
        message: `No FinAccount found with id: ${req.body.acct_id}`
      });
    }
  }
  // acct_id validation - end

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
    const usrFinAcctData = new UsrFinAccount({
      usr_id: req.body.usr_id,
      acct_id: req.body.acct_id
    });

    usrFinAcctData.save()
      .then(usrFinAcct => res.status(201).json(usrFinAcct))
      .catch(err => res.status(500).json({
        error: err,
        success: false,
        message: `Failed to create UsrFinAccount`
      }));
  }
};

const getUsrFinAccounts = async (req, res) => {
  console.log(':::::[getUsrFinAccountsApi]:::::');

  if (req.query.acctIds && req.query.acctNums)
    res.status(400).json({
      success: false,
      message: `Query with either acct_id or acct_num, not with both`
    });

  let filters = {};
  if (req.query.usrIds)
    filters.usr_id = req.query.usrIds.split(',');
  if (req.query.acctIds)
    filters.acct_id = req.query.acctIds.split(',');
  if (req.query.acctNums)
    filters.acct_id = await getAcctIdsByAcctNums(req.query.acctNums.split(','));

  let usr = req.query.usr;
  let acct = req.query.acct;

  if (usr) {
    if (usr === 'no' || usr === 'n' ||
        usr === 'NO' || usr === 'N')
      usr = null;
  }
  if (acct) {
    if (acct === 'no' || acct === 'n' ||
        acct === 'NO' || acct === 'N')
      acct = null;
  }

  UsrFinAccount.find(filters)
    .populate(usr ? 'usr_id' : '')
    .populate(acct ? 'acct_id' : '')
    .then(usrFinAccts => res.status(200).json(usrFinAccts))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch UsrFinAccount data`
    }));
};

const getUsrFinAccount = (req, res) => {
  console.log(':::::[getUsrFinAccountApi]:::::');

  UsrFinAccount.findById(req.params.id)
    .populate('acct_id')
    .populate('usr_id')
    .then(usrFinAcct => res.status(200).json(usrFinAcct))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch UsrFinAccount with id: ${req.params.id}`
    }));
};

const updateUsrFinAccount = async (req, res) => {
  console.log(':::::[updateUsrFinAccountApi]:::::');

  let isValid = true;

  // acct_id validation
  if (req.body.acct_id) {
    if (!mongoose.isValidObjectId(req.body.acct_id)) {
      isValid = false;
      res.status(400).send('Invalid FinAccount id');
    }

    try {
      const finAcct = await FinAccount.findById(req.body.acct_id);
      if (!finAcct) {
        throw new Error();
      }
    } catch(err) {
      isValid = false;
      res.status(400).json({
        success: false,
        message: `No FinAccount found with id: ${req.body.acct_id}`
      });
    }
  }
  // acct_id validation - end

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
    const updatedUsrFinAcctData = {
      usr_id: req.body.usr_id,
      acct_id: req.body.acct_id
    };

    UsrFinAccount.findByIdAndUpdate(req.params.id, updatedUsrFinAcctData, {new: true})
      .then(updatedUsrFinAcct => res.json(updatedUsrFinAcct))
      .catch(err => res.status(400).json({
        error: err,
        success: false,
        message: `Failed to update UsrFinAccount with id: ${req.params.id}`
      }));
  }
};

const deleteUsrFinAccount = (req, res) => {
  console.log(':::::[deleteUsrFinAccountApi]:::::');

  if (!mongoose.isValidObjectId(req.params.id)) {
    res.status(400).send('Invalid UsrFinAccount id');
  }

  UsrFinAccount.findByIdAndRemove(req.params.id)
    .then(deletedUsrFinAccount => {
      if (deletedUsrFinAccount)
        return res.status(200).json({success: true, message: 'UsrFinAccount is deleted'})
      else
        return res.status(404).json({success: false, message: 'UsrFinAccount not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted UsrFinAccount with id: ${req.params.id}`
    }));
};

module.exports = {
  createUsrFinAccount,
  getUsrFinAccounts,
  getUsrFinAccount,
  updateUsrFinAccount,
  deleteUsrFinAccount
};


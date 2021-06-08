const FinAccount = require('../models/finAccount');
const { validateRequest } = require('../helpers/requestValidators');

/**
 * @Dependency: Organization
 * */

const createFinAccount = async (req, res) => {
  console.log(':::::[createFinAccountApi]:::::');

  await validateRequest(req, res);

  // save finAccount with org_id
  const finAccountData = new FinAccount({
    acct_number: req.body.acct_number,
    acct_owner_name: req.body.acct_owner_name,
    type: req.body.type,
    status: req.body.status,
    org_id: req.body.org_id
  });

  finAccountData.save()
    .then(finAcct => res.status(201).json(finAcct))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create FinAccount`
    }));
};

const getFinAccounts = (req, res) => {
  console.log(':::::[getFinAccountsApi]:::::');

  FinAccount.find()
    // .populate('org_id') // send org_data with finAcct data
    .then(finAccts => res.status(200).json(finAccts))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch FinAccount data`
    }));
};

const getFinAccount = (req, res) => {
  console.log(':::::[getFinAccountApi]:::::');

  FinAccount.findById(req.params.id)
    .populate('org_id') // send org_data with finAcct data
    .then(finAcct => res.status(200).json(finAcct))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch FinAccount with id: ${req.params.id}`
    }));
};

const updateFinAccount = async (req, res) => {
  console.log(':::::[updateFinAccountApi]:::::');

  await validateRequest(req, res);

  const updatedFinAcctData = {
    acct_number: req.body.acct_number,
    acct_owner_name: req.body.acct_owner_name,
    type: req.body.type,
    status: req.body.status,
    org_id: req.body.org_id
  };

  FinAccount.findByIdAndUpdate(req.params.id, updatedFinAcctData, {new: true})
    .then(updatedFinAcct => res.json(updatedFinAcct))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update FinAccount with id: ${req.params.id}`
    }));
};

const deleteFinAccount = (req, res) => {
  console.log(':::::[deleteFinAccountApi]:::::');

  FinAccount.findByIdAndRemove(req.params.id)
    .then(deletedFinAcct => {
      if (deletedFinAcct)
        return res.status(200).json({success: true, message: 'FinAccount is deleted'})
      else
        return res.status(404).json({success: false, message: 'FinAccount not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted FinAccount with id: ${req.params.id}`
    }));
};

module.exports = {
  createFinAccount,
  getFinAccounts,
  getFinAccount,
  updateFinAccount,
  deleteFinAccount
};
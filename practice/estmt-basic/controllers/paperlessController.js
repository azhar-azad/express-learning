const mongoose = require('mongoose');
const Paperless = require('../models/paperless');
const FinAccount = require('../models/finAccount');

/**
 * @Dependency: FinAccount
 * */

const createPaperless = async (req, res) => {
  console.log(':::::[createPaperlessApi]:::::');

  // fin_account validation
  if (req.body.acct_id) {
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

  const paperlessData = new Paperless({
    p_old_status: req.body.p_old_status,
    p_new_status: req.body.p_new_status,
    stmt_type: req.body.stmt_type,
    acct_id: req.body.acct_id
  });

  paperlessData.save()
    .then(paperless => res.status(201).json(paperless))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create Paperless`
    }));
};

const getPaperlesses = async (req, res) => {
  console.log(':::::[getPaperlessesApi]:::::');

  let filters = {};
  if (req.query.stmtTypes)
    filters.stmt_type = req.query.stmtTypes.split(',');
  if (req.query.old)
    filters.p_old_status = req.query.old.split(',');
  if (req.query.new)
    filters.p_new_status = req.query.new.split(',');

  let acct = req.query.acct;
  if (acct) {
    if (acct === 'no' || acct === 'n' || acct === 'NO' || acct === 'N')
      acct = null;
  }

  Paperless.find(filters)
    .populate(acct ? 'acct_id' : null)
    .then(paperlesses => res.status(200).json(paperlesses))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch Paperless data`
    }));
};

const getPaperless = (req, res) => {
  console.log(':::::[getPaperlessApi]:::::');

  Paperless.findById(req.params.id)
    .populate({
      path: 'acct_id', populate: 'org_id'
    })
    .populate('arch_file_id')
    .then(etax => res.status(200).json(etax))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch Paperless with id: ${req.params.id}`
    }));
};

const updatePaperless = async (req, res) => {
  console.log(':::::[updatePaperlessApi]:::::');

  // fin_account validation
  if (req.body.acct_id) {
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

  const updatedPaperlessData = {
    p_old_status: req.body.p_old_status,
    p_new_status: req.body.p_new_status,
    stmt_type: req.body.stmt_type,
    acct_id: req.body.acct_id
  };

  Paperless.findByIdAndUpdate(req.params.id, updatedPaperlessData, {new: true})
    .then(updatedPaperless => res.json(updatedPaperless))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update Paperless with id: ${req.params.id}`
    }));
};

const deletePaperless = (req, res) => {
  console.log(':::::[deletePaperlessApi]:::::');

  Paperless.findByIdAndRemove(req.params.id)
    .then(deletedPaperless => {
      if (deletedPaperless)
        return res.status(200).json({success: true, message: 'Paperless is deleted'})
      else
        return res.status(404).json({success: false, message: 'Paperless not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted Paperless with id: ${req.params.id}`
    }));
};

const isDate = (date) => {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

module.exports = {
  createPaperless,
  getPaperlesses,
  getPaperless,
  updatePaperless,
  deletePaperless
};
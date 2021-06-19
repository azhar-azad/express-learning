const mongoose = require('mongoose');
const Paperless2 = require('../models/paperless2');
const FinAccount = require('../models/finAccount');

/**
 * @Dependency: FinAccount
 * */

const createPaperless2 = async (req, res) => {
  console.log(':::::[createPaperless2Api]:::::');

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

  const paperless2Data = new Paperless2({
    p_old_status: req.body.p_old_status,
    p_latest_status: req.body.p_latest_status,
    stmt_type: req.body.stmt_type,
    acct_id: req.body.acct_id
  });

  paperless2Data.save()
    .then(paperless2 => res.status(201).json(paperless2))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create Paperless2`
    }));
};

const getPaperless2s = async (req, res) => {
  console.log(':::::[getPaperless2sApi]:::::');

  let filters = {};
  if (req.query.stmtTypes)
    filters.stmt_type = req.query.stmtTypes.split(',');
  if (req.query.old)
    filters.p_old_status = req.query.old.split(',');
  if (req.query.new)
    filters.p_latest_status = req.query.new.split(',');

  let acct = req.query.acct;
  if (acct) {
    if (acct === 'no' || acct === 'n' || acct === 'NO' || acct === 'N')
      acct = null;
  }

  Paperless2.find(filters)
    .populate(acct ? 'acct_id' : null)
    .then(paperless2s => res.status(200).json(paperless2s))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch Paperless2 data`
    }));
};

const getPaperless2 = (req, res) => {
  console.log(':::::[getPaperless2Api]:::::');

  Paperless2.findById(req.params.id)
    .populate({
      path: 'acct_id', populate: 'org_id'
    })
    .then(paperless2 => res.status(200).json(paperless2))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch Paperless2 with id: ${req.params.id}`
    }));
};

const updatePaperless2 = async (req, res) => {
  console.log(':::::[updatePaperless2Api]:::::');

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
    p_latest_status: req.body.p_latest_status,
    stmt_type: req.body.stmt_type,
    acct_id: req.body.acct_id
  };

  Paperless2.findByIdAndUpdate(req.params.id, updatedPaperlessData, {new: true})
    .then(updatedPaperless2 => res.json(updatedPaperless2))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update Paperless2 with id: ${req.params.id}`
    }));
};

const deletePaperless2 = (req, res) => {
  console.log(':::::[deletePaperless2Api]:::::');

  Paperless2.findByIdAndRemove(req.params.id)
    .then(deletedPaperless2 => {
      if (deletedPaperless2)
        return res.status(200).json({success: true, message: 'Paperless2 is deleted'})
      else
        return res.status(404).json({success: false, message: 'Paperless2 not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted Paperless2 with id: ${req.params.id}`
    }));
};

module.exports = {
  createPaperless2,
  getPaperless2s,
  getPaperless2,
  updatePaperless2,
  deletePaperless2
};
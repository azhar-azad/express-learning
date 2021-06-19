const mongoose = require('mongoose');
const EstmtDoc = require('../models/estmtDoc');
const FinAccount = require('../models/finAccount');

/**
 * @Dependency: FinAccount
 * */

const createEstmtDoc = async (req, res) => {
  console.log(':::::[createEstmtDocApi]:::::');

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

  let beginDate = isDate(req.body.esd_begindate) ? new Date(req.body.esd_begindate) : null;
  if (!beginDate) {
    res.status(400).json({
      success: false,
      message: `Not a date: esd_begindate`
    });
    return;
  }

  let closingDate = isDate(req.body.esd_closingdate) ? new Date(req.body.esd_closingdate) : null;
  if (!closingDate) {
    res.status(400).json({
      success: false,
      message: `Not a date: esd_closingdate`
    });
    return;
  }

  const estmtDocData = new EstmtDoc({
    esd_begindate: beginDate,
    esd_closingdate: closingDate,
    stmt_type: req.body.stmt_type,
    acct_id: req.body.acct_id
  });

  estmtDocData.save()
    .then(estmtDoc => res.status(201).json(estmtDoc))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create EstmtDoc`
    }));
};

const getEstmtDocs = async (req, res) => {
  console.log(':::::[getEstmtDocsApi]:::::');

  let filters = {};
  if (req.query.stmtTypes)
    filters.stmt_type = req.query.stmtTypes.split(',');

  let acct = req.query.acct;
  if (acct) {
    if (acct === 'no' || acct === 'n' || acct === 'NO' || acct === 'N')
      acct = null;
  }

  EstmtDoc.find(filters)
    .populate(acct ? 'acct_id' : null)
    .then(estmtDocs => res.status(200).json(estmtDocs))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch EstmtDoc data`
    }));
};

const getEstmtDoc = (req, res) => {
  console.log(':::::[getEstmtDocApi]:::::');

  EstmtDoc.findById(req.params.id)
    .populate('acct_id')
    .then(estmtDoc => res.status(200).json(estmtDoc))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch EstmtDoc with id: ${req.params.id}`
    }));
};

const updateEstmtDoc = async (req, res) => {
  console.log(':::::[updateEstmtDocApi]:::::');

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

  let beginDate = isDate(req.body.esd_begindate) ? new Date(req.body.esd_begindate) : null;
  if (!beginDate) {
    res.status(400).json({
      success: false,
      message: `Not a date: esd_begindate`
    });
    return;
  }

  let closingDate = isDate(req.body.esd_closingdate) ? new Date(req.body.esd_closingdate) : null;
  if (!closingDate) {
    res.status(400).json({
      success: false,
      message: `Not a date: esd_closingdate`
    });
    return;
  }

  const updatedEstmtDocData = {
    esd_begindate: beginDate,
    esd_closingdate: closingDate,
    stmt_type: req.body.stmt_type,
    acct_id: req.body.acct_id
  };

  EstmtDoc.findByIdAndUpdate(req.params.id, updatedEstmtDocData, {new: true})
    .then(updatedEstmtDoc => res.json(updatedEstmtDoc))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update EstmtDoc with id: ${req.params.id}`
    }));
};

const deleteEstmtDoc = (req, res) => {
  console.log(':::::[deleteEstmtDocApi]:::::');

  EstmtDoc.findByIdAndRemove(req.params.id)
    .then(deletedEstmtDoc => {
      if (deletedEstmtDoc)
        return res.status(200).json({success: true, message: 'EstmtDoc is deleted'})
      else
        return res.status(404).json({success: false, message: 'EstmtDoc not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted EstmtDoc with id: ${req.params.id}`
    }));
};

const isDate = (date) => {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

module.exports = {
  createEstmtDoc,
  getEstmtDocs,
  getEstmtDoc,
  updateEstmtDoc,
  deleteEstmtDoc
};
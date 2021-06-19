const mongoose = require('mongoose');
const Etax = require('../models/etax');
const FinAccount = require('../models/finAccount');
const ArchFile = require('../models/archFile');

/**
 * @Dependency: FinAccount, ArchFile
 * */

const createEtax = async (req, res) => {
  console.log(':::::[createEtaxApi]:::::');

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

  // arch_file validation
  if (req.body.arch_file_id) {
    if (!mongoose.isValidObjectId(req.body.arch_file_id)) {
      res.status(400).send('Invalid ArchFile id');
      return;
    }

    try {
      const archFile = await ArchFile.findById(req.body.arch_file_id);
      if (!archFile) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No ArchFile found with id: ${req.body.arch_file_id}`
      });
      return;
    }
  }
  // arch_file validation - end

  let etaxStamp = isDate(req.body.etax_stamp) ? new Date(req.body.etax_stamp) : null;
  if (!etaxStamp) {
    res.status(400).json({
      success: false,
      message: `Not a date: etax_stamp`
    });
    return;
  }

  const etaxData = new Etax({
    etax_stamp: etaxStamp,
    etax_type: req.body.etax_type,
    acct_id: req.body.acct_id,
    arch_file_id: req.body.arch_file_id
  });

  etaxData.save()
    .then(etax => res.status(201).json(etax))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create Etax`
    }));
};

const getEtaxes = async (req, res) => {
  console.log(':::::[getEtaxesApi]:::::');

  let filters = {};
  if (req.query.etaxTypes)
    filters.etax_type = req.query.etaxTypes.split(',');

  let acct = req.query.acct;
  if (acct) {
    if (acct === 'no' || acct === 'n' || acct === 'NO' || acct === 'N')
      acct = null;
  }
  let arch = req.query.arch;
  if (arch) {
    if (arch === 'no' || arch === 'n' || arch === 'NO' || arch === 'N')
      arch = null;
  }

  Etax.find(filters)
    .populate(acct ? 'acct_id' : null)
    .populate(arch ? 'arch_file_id' : null)
    .then(etaxes => res.status(200).json(etaxes))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch Etax data`
    }));
};

const getEtax = (req, res) => {
  console.log(':::::[getEtaxApi]:::::');

  Etax.findById(req.params.id)
    .populate({
      path: 'acct_id', populate: 'org_id'
    })
    .populate('arch_file_id')
    .then(etax => res.status(200).json(etax))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch Etax with id: ${req.params.id}`
    }));
};

const updateEtax = async (req, res) => {
  console.log(':::::[updateEtaxApi]:::::');

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

  // arch_file validation
  if (req.body.arch_file_id) {
    if (!mongoose.isValidObjectId(req.body.arch_file_id)) {
      res.status(400).send('Invalid ArchFile id');
      return;
    }

    try {
      const archFile = await ArchFile.findById(req.body.arch_file_id);
      if (!archFile) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No ArchFile found with id: ${req.body.arch_file_id}`
      });
      return;
    }
  }
  // arch_file validation - end

  let etaxStamp = isDate(req.body.etax_stamp) ? new Date(req.body.etax_stamp) : null;
  if (!etaxStamp) {
    res.status(400).json({
      success: false,
      message: `Not a date: etax_stamp`
    });
    return;
  }

  const updatedEtaxData = {
    etax_stamp: etaxStamp,
    etax_type: req.body.etax_type,
    acct_id: req.body.acct_id,
    arch_file_id: req.body.arch_file_id
  };

  Etax.findByIdAndUpdate(req.params.id, updatedEtaxData, {new: true})
    .then(updatedEtax => res.json(updatedEtax))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update Etax with id: ${req.params.id}`
    }));
};

const deleteEtax = (req, res) => {
  console.log(':::::[deleteEtaxApi]:::::');

  Etax.findByIdAndRemove(req.params.id)
    .then(deletedEtax => {
      if (deletedEtax)
        return res.status(200).json({success: true, message: 'Etax is deleted'})
      else
        return res.status(404).json({success: false, message: 'Etax not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted Etax with id: ${req.params.id}`
    }));
};

const isDate = (date) => {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

module.exports = {
  createEtax,
  getEtaxes,
  getEtax,
  updateEtax,
  deleteEtax
};
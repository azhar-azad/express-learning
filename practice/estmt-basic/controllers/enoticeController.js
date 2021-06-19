const mongoose = require('mongoose');
const Enotice = require('../models/enotice');
const FinAccount = require('../models/finAccount');
const ArchFile = require('../models/archFile');

/**
 * @Dependency: FinAccount, ArchFile
 * */

const createEnotice = async (req, res) => {
  console.log(':::::[createEnoticeApi]:::::');

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

  let enoticeStamp = isDate(req.body.enotice_stamp) ? new Date(req.body.enotice_stamp) : null;
  if (!enoticeStamp) {
    res.status(400).json({
      success: false,
      message: `Not a date: enotice_stamp`
    });
    return;
  }

  const enoticeData = new Enotice({
    enotice_stamp: enoticeStamp,
    enotice_type: req.body.enotice_type,
    acct_id: req.body.acct_id,
    arch_file_id: req.body.arch_file_id
  });

  enoticeData.save()
    .then(enotice => res.status(201).json(enotice))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create Enotice`
    }));
};

const getEnotices = async (req, res) => {
  console.log(':::::[getEnoticesApi]:::::');

  let filters = {};
  if (req.query.enoticeTypes)
    filters.enotice_type = req.query.enoticeTypes.split(',');

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

  Enotice.find(filters)
    .populate(acct ? 'acct_id' : null)
    .populate(arch ? 'arch_file_id' : null)
    .then(enotices => res.status(200).json(enotices))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch Enotice data`
    }));
};

const getEnotice = (req, res) => {
  console.log(':::::[getEnoticeApi]:::::');

  Enotice.findById(req.params.id)
    .populate({
      path: 'acct_id', populate: 'org_id'
    })
    .populate('arch_file_id')
    .then(enotice => res.status(200).json(enotice))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch Enotice with id: ${req.params.id}`
    }));
};

const updateEnotice = async (req, res) => {
  console.log(':::::[updateEnoticeApi]:::::');

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

  let enoticeStamp = isDate(req.body.enotice_stamp) ? new Date(req.body.enotice_stamp) : null;
  if (!enoticeStamp) {
    res.status(400).json({
      success: false,
      message: `Not a date: enotice_stamp`
    });
    return;
  }

  const updatedEnoticeData = {
    enotice_stamp: enoticeStamp,
    enotice_type: req.body.enotice_type,
    acct_id: req.body.acct_id,
    arch_file_id: req.body.arch_file_id
  };

  Enotice.findByIdAndUpdate(req.params.id, updatedEnoticeData, {new: true})
    .then(updatedEnotice => res.json(updatedEnotice))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update Enotice with id: ${req.params.id}`
    }));
};

const deleteEnotice = (req, res) => {
  console.log(':::::[deleteEnoticeApi]:::::');

  Enotice.findByIdAndRemove(req.params.id)
    .then(deletedEnotice => {
      if (deletedEnotice)
        return res.status(200).json({success: true, message: 'Enotice is deleted'})
      else
        return res.status(404).json({success: false, message: 'Enotice not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted Enotice with id: ${req.params.id}`
    }));
};

const isDate = (date) => {
  return (new Date(date) !== "Invalid Date") && !isNaN(new Date(date));
}

module.exports = {
  createEnotice,
  getEnotices,
  getEnotice,
  updateEnotice,
  deleteEnotice
};
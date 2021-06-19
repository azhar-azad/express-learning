const mongoose = require('mongoose');
const EstmtFile = require('../models/estmtFile');
const EstmtDoc = require('../models/estmtDoc');
const ArchFile = require('../models/archFile');

/**
 * @Dependency: EstmtDoc, ArchFile
 * */

const createEstmtFile = async (req, res) => {
  console.log(':::::[createEstmtFileApi]:::::');

  // estmt_doc validation
  if (req.body.esd_id) {
    if (!mongoose.isValidObjectId(req.body.esd_id)) {
      res.status(400).send('Invalid EstmtDoc id');
      return;
    }

    try {
      const estmtDoc = await EstmtDoc.findById(req.body.esd_id);
      if (!estmtDoc) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No EstmtDoc found with id: ${req.body.esd_id}`
      });
      return;
    }
  }
  // estmt_doc validation - end

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

  let stmt_type = req.body.stmt_type;
  if (!stmt_type) {
    let esd = await EstmtDoc.findById(req.body.esd_id);
    if (!esd) {
      res.status(400).json({
        success: false,
        message: `EstmtDoc entity not found. Maybe esd_id is invalid`
      });
      return;
    }
    stmt_type = esd.stmt_type;
  }

  const estmtFileData = new EstmtFile({
    stmt_type: stmt_type,
    esd_id: req.body.esd_id,
    arch_file_id: req.body.arch_file_id
  });

  estmtFileData.save()
    .then(estmtFile => res.status(201).json(estmtFile))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create EstmtFile`
    }));
};

const getEstmtFiles = async (req, res) => {
  console.log(':::::[getEstmtFilesApi]:::::');

  let filters = {};
  if (req.query.stmtTypes)
    filters.stmt_type = req.query.stmtTypes.split(',');

  let esd = req.query.esd;
  if (esd) {
    if (esd === 'no' || esd === 'n' || esd === 'NO' || esd === 'N')
      esd = null;
  }
  let arch = req.query.arch;
  if (arch) {
    if (arch === 'no' || arch === 'n' || arch === 'NO' || arch === 'N')
      arch = null;
  }
  let acct = req.query.acct;
  if (acct) {
    if (acct === 'no' || acct === 'n' || acct === 'NO' || acct === 'N')
      acct = null;
  }

  EstmtFile.find(filters)
    .populate(esd ? {
      path: 'esd_id', populate: acct ? 'acct_id' : null
    } : null)
    .populate(arch ? 'arch_file_id' : null)
    .then(estmtFiles => res.status(200).json(estmtFiles))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch EstmtFile data`
    }));
};

const getEstmtFile = (req, res) => {
  console.log(':::::[getEstmtFileApi]:::::');

  EstmtFile.findById(req.params.id)
    .populate({
      path: 'esd_id', populate: {
        path: 'acct_id', populate: 'org_id'
      }
    })
    .populate('arch_file_id')
    .then(estmtDoc => res.status(200).json(estmtDoc))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch EstmtFile with id: ${req.params.id}`
    }));
};

const updateEstmtFile = async (req, res) => {
  console.log(':::::[updateEstmtFileApi]:::::');

  // estmt_doc validation
  if (req.body.esd_id) {
    if (!mongoose.isValidObjectId(req.body.esd_id)) {
      res.status(400).send('Invalid EstmtDoc id');
      return;
    }

    try {
      const estmtDoc = await EstmtDoc.findById(req.body.esd_id);
      if (!estmtDoc) {
        throw new Error();
      }
    } catch(err) {
      res.status(400).json({
        success: false,
        message: `No EstmtDoc found with id: ${req.body.esd_id}`
      });
      return;
    }
  }
  // estmt_doc validation - end

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

  let stmt_type = req.body.stmt_type;
  if (!stmt_type) {
    let esd = await EstmtDoc.findById(req.body.esd_id);
    if (!esd) {
      res.status(400).json({
        success: false,
        message: `EstmtDoc entity not found. Maybe esd_id is invalid`
      });
      return;
    }
    stmt_type = esd.stmt_type;
  }

  const updatedEstmtFileData = {
    stmt_type: stmt_type,
    esd_id: req.body.esd_id,
    arch_file_id: req.body.arch_file_id
  };

  EstmtFile.findByIdAndUpdate(req.params.id, updatedEstmtFileData, {new: true})
    .then(updatedEstmtFile => res.json(updatedEstmtFile))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update EstmtFile with id: ${req.params.id}`
    }));
};

const deleteEstmtFile = (req, res) => {
  console.log(':::::[deleteEstmtFileApi]:::::');

  EstmtFile.findByIdAndRemove(req.params.id)
    .then(deletedEstmtFile => {
      if (deletedEstmtFile)
        return res.status(200).json({success: true, message: 'EstmtFile is deleted'})
      else
        return res.status(404).json({success: false, message: 'EstmtFile not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted EstmtFile with id: ${req.params.id}`
    }));
};

module.exports = {
  createEstmtFile,
  getEstmtFiles,
  getEstmtFile,
  updateEstmtFile,
  deleteEstmtFile
};
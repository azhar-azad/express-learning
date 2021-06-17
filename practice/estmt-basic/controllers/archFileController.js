const mongoose = require('mongoose');
const ArchFile = require('../models/archFile');

/**
 * @Dependency: No dependency
 * */

const createArchFile = (req, res) => {
  console.log(':::::[createArchFileApi]:::::');

  let fileName = req.body.file_name;
  if (fileName.indexOf('.') === -1) {
    res.status(400).json({
      success: false,
      message: `File name without extension is invalid`
    });
    return;
  }

  let fileType = req.body.file_type;
  if (!fileType) {
    fileType = fileName.substring(fileName.indexOf('.')+1, fileName.length);
  }

  const archFileData = new ArchFile({
    file_name: fileName,
    file_type: fileType
  });

  archFileData.save()
    .then(archFile => res.status(201).json(archFile))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to create ArchFile`
    }));
};

const getArchFiles = (req, res) => {
  console.log(':::::[getArchFilesApi]:::::');

  ArchFile.find()
    .then(archFiles => res.status(200).json(archFiles))
    .catch(err => res.status(500).json({
      error: err,
      success: false,
      message: `Failed to fetch ArchFile data`
    }));
};

const getArchFile = (req, res) => {
  console.log(':::::[getArchFileApi]:::::');

  ArchFile.findById(req.params.id)
    .then(archFile => res.status(200).json(archFile))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to fetch ArchFile with id: ${req.params.id}`
    }));
};

const updateArchFile = (req, res) => {
  console.log(':::::[updateArchFileApi]:::::');

  if (!mongoose.isValidObjectId(req.params.id)) { // validating id
    res.status(400).send('Invalid ArchFile id');
    return;
  }

  let fileName = req.body.file_name;
  if (fileName.indexOf('.') === -1) {
    res.status(400).json({
      success: false,
      message: `File name without extension is invalid`
    });
    return;
  }

  let fileType = req.body.file_type;
  if (!fileType) {
    fileType = fileName.substring(fileName.indexOf('.')+1, fileName.length);
  }

  const updatedArchFileData = {
    file_name: fileName,
    file_type: fileType
  };

  ArchFile.findByIdAndUpdate(req.params.id, updatedArchFileData, {new: true})
    .then(updatedArchFile => res.json(updatedArchFile))
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to update ArchFile with id: ${req.params.id}`
    }));
};

const deleteArchFile = (req, res) => {
  console.log(':::::[deleteArchFileApi]:::::');

  ArchFile.findByIdAndRemove(req.params.id)
    .then(deletedArchFile => {
      if (deletedArchFile)
        return res.status(200).json({success: true, message: 'ArchFile is deleted'})
      else
        return res.status(404).json({success: false, message: 'ArchFile not found'})
    })
    .catch(err => res.status(400).json({
      error: err,
      success: false,
      message: `Failed to deleted ArchFile with id: ${req.params.id}`
    }));
};

module.exports = {
  createArchFile,
  getArchFiles,
  getArchFile,
  updateArchFile,
  deleteArchFile
};
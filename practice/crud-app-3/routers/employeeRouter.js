const express = require('express');
const employeeRouter = express.Router();

const {
    renderAddOrEditTemplate,
    insertOrUpdateRecord,
    getAllEmployees,
    getEmployee,
    deleteEmployee
} = require('../controllers/employeeController');

console.log('::: employeeRouter.js :::');

// RENDER TEMPLATE: addOrEdit
employeeRouter.get('/add', renderAddOrEditTemplate);

// CREATE & UPDATE EMPLOYEE RECORD :: POST /
employeeRouter.post('/', insertOrUpdateRecord);

// GET ALL EMPLOYEE RECORDS
employeeRouter.get('/list', getAllEmployees);

// GET EMPLOYEE BY ID :: GET /:id
employeeRouter.get('/:id', getEmployee);

// DELETE EMPLOYEE BY ID
employeeRouter.get('/delete/:id', deleteEmployee);

module.exports = employeeRouter;
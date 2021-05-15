const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const Employee = mongoose.model('Employee');

router.get('/', (req, res) => {
    res.render('employee/addOrEdit', { // render addOrEdit template
        viewTitle: 'Insert Employee'
    });
});

router.post('/', (req, res) => {
    console.log(req.body); // this hi will be printed in IDE console
    insertRecord(req, res);
});

router.get('/list', (req, res) => {
    res.json('From MongoDB collection');
    // Employee.find().lean().then(docs => {
    //     res.render('employee/list', { // render list template
    //         list: docs
    //     });
    // }).catch(err => {
    //     console.log('Error in retrieving employee list: ' + err);
    // });
    Employee.find((err, docs) => {
        if (err) {
            console.log('Error in retrieving employee list: ' + err);
        }
        else {
            res.render('employee/list', { // render list template
                list: docs
            });
        }
    }).lean();
});

const insertRecord = (req, res) => {
    let employee = new Employee();
    employee.fullName = req.body.fullName;
    employee.email = req.body.email;
    employee.phoneNumber = req.body.phoneNumber;
    employee.city = req.body.city;
    employee.save((err, doc) => {
        if(err) {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('employee/addOrEdit', {
                    viewTitle: 'Insert Employee',
                    employee: req.body
                })
            }
            else {
                console.log('Error during record insertion: ' + err);
            }
        }
        else {
            res.redirect('employees/list');
        }
    });
};

const handleValidationError = (err, body) => {
    for(let field in err.errors) {
        switch (err.errors[field].path) {
            case 'fullName':
                body['fullNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
};

module.exports = router;
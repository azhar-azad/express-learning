const Employee = require('../models/Employee');

console.log('::: employeeController.js :::');

const renderAddOrEditTemplate = (req, res) => {
    res.render('employee/addOrEdit', {
        viewTitle: 'Insert Employee'
    });
};

const insertOrUpdateRecord = (req, res) => {
    if (req.body._id === '') {
        insertRecord(req, res);
    }
    else {
        updateRecord(req, res);
    }

    // if (req.body._id) {
    //     updateRecord(req, res);
    // }
    // else {
    //     insertRecord(req, res);
    // }
};

const getAllEmployees = (req, res) => {
    Employee.find((err, docs) => {
        if (err) {
            console.log('Error in retrieving employee list: ' + err);
            // res.status(500).json({
            //     success: false,
            //     message: 'Error in retrieving employee list: ' + err
            // });
        }
        else {
            res.render('employee/list', {
                employeeList: docs
            });
            // res.status(200).json(docs);
        }
    }).lean();
};

const getEmployee = (req, res) => {
    Employee.findById(req.params.id, (err, doc) => {
        if (err) {
            res.status(500).json({
                success: false,
                message: 'Error in retrieving employee with id: ' + req.params.id + ' | ' + err
            });
        }
        else {
            res.render('employee/addOrEdit', {
                viewTitle: 'Update Employee',
                employee: doc
            });
            // res.status(200).json(doc);
        }
    }).lean();
};

const deleteEmployee = (req, res) => {
    Employee.findByIdAndRemove(req.params.id, (err, doc) => {
        if (err) {
            console.log('Error in employee delete: ' + err);
            // res.status(500).json({
            //     success: false,
            //     message: 'Error in deleting employee with id: ' + req.params.id + ' | ' + err
            // });
        }
        else {
            getAllEmployees(req, res);
            // res.status(200).json(doc);
        }
    })
};

const insertRecord = (req, res) => {
    console.log('inserting a record');

    let employee = new Employee();
    employee.firstName = req.body.firstName;
    employee.lastName = req.body.lastName;
    employee.email = req.body.email;
    employee.city = req.body.city;

    employee.save((err, doc) => {
        if (err) {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('employee/addOrEdit', {
                    viewTitle: 'Insert Employee',
                    employee: req.body
                });
            }
            else {
                console.log('Error during record insertion: ' + err);
            }
            // res.status(500).json({
            //     success: false,
            //     message: 'Error in creating new employee: ' + err
            // });
        }
        else {
            res.redirect('employees/list');
            // res.status(201).json(doc);
        }
    });
};

const updateRecord = (req, res) => {
    console.log('updating a record');

    Employee.findOneAndUpdate({_id: req.body._id}, req.body, {new: true}, (err, doc) => {
        if (err) {
            if (err.name === 'ValidationError') {
                handleValidationError(err, req.body);
                res.render('employee/addOrEdit', {
                    viewTitle: 'Update Employee',
                    employee: req.body
                });
            }
            else {
                console.log('Error during record update: ' + err);
            }
            // res.status(500).json({
            //     success: false,
            //     message: 'Error in updating employee with id: ' + req.body._id + ' | ' + err
            // });
        }
        else {
            res.redirect('employees/list');
            // res.status(200).json(doc);
        }
    });
};

const handleValidationError = (err, body) => {
    for (let field in err.errors) {
        switch (err.errors[field].path) {
            case 'firstName':
                body['firstNameError'] = err.errors[field].message;
                break;
            case 'lastName':
                body['lastNameError'] = err.errors[field].message;
                break;
            case 'email':
                body['emailError'] = err.errors[field].message;
                break;
            default:
                break;
        }
    }
}

module.exports = {
    renderAddOrEditTemplate,
    insertOrUpdateRecord,
    getAllEmployees,
    getEmployee,
    deleteEmployee
};
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/crud_app_2_db', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}, (err) => {
    if (!err) {
        console.log('MongoDB Connection Succeeded.');
    }
    else {
        console.log('Error in DB connection: ' + err);
    }
});

require('./employee.model');


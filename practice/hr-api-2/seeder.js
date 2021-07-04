/** 
 * Run command: node seeder.js -i
 * -i: to import data 
 * -d: to delete data
*/

const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const colors = require('colors');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Load models
const Employee = require('./models/Employee');
const Department = require('./models/Department');

// Connect to database
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
});

// Read JSON files
const employees = JSON.parse(
  fs.readFileSync(`${__dirname}/_mock_data/employees.json`, 'utf-8')
);
const departments = JSON.parse(
  fs.readFileSync(`${__dirname}/_mock_data/departments.json`, 'utf-8')
);

// Import into DB
const importData = async () => {
  try {
    // await Employee.create(employees);
    await Department.create(departments);

    console.log('Data Imported ... '.green.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

// Delete data
const deleteData = async () => {
  try {
    // await Employee.deleteMany();
    await Department.deleteMany();

    console.log('Data Destroyed ... '.red.inverse);
    process.exit();
  } catch (err) {
    console.error(err);
  }
};

if (process.argv[2] === '-i') { // import
  importData();
} else if (process.argv[2] === '-d') { // delete
  deleteData();
}
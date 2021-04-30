const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const regionRouter = require('./routes/regionRouter.js');
const countryRouter = require('./routes/countryRouter.js');
const locationRouter = require('./routes/locationRouter.js');
const jobRouter = require('./routes/jobRouter.js');
const departmentRouter = require('./routes/departmentRouter.js');
const employeeRouter = require('./routes/employeeRouter.js');
const jobHistoryRouter = require('./routes/jobHistoryRouter.js');

mongoose.connect('mongodb://localhost/Hr_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/regions', regionRouter);
app.use('/countries', countryRouter);
app.use('/locations', locationRouter);
app.use('/jobs', jobRouter);
app.use('/departments', departmentRouter);
app.use('/employees', employeeRouter);
app.use('/jobHistories', jobHistoryRouter);

app.get('/', (req, res) => {
  res.send('HOME PAGE test');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
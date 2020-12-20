const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const regionRouter = require('./routes/regionRouter.js');
const countryRouter = require('./routes/countryRouter.js');

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

app.get('/', (req, res) => {
  res.send('HOME PAGE test');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
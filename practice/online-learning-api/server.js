const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const courseRouter = require('./routes/courseRouter.js');
const reviewRouter = require('./routes/reviewRouter.js');
const studentRouter = require('./routes/studentRouter.js');
const passportRouter = require('./routes/passportRouter.js');

mongoose.connect('mongodb://localhost/OnlineLearning_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/courses', courseRouter);
app.use('/reviews', reviewRouter);
app.use('/students', studentRouter);
app.use('/passports', passportRouter);

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
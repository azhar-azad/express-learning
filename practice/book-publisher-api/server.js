const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const pubRouter = require('./routes/publisherRouter.js');
const bookRouter = require('./routes/bookRouter.js');

mongoose.connect('mongodb://localhost/BookPublisher_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use('/publishers', pubRouter);
app.use('/books', bookRouter);

app.get('/', (req, res) => {
  res.send('HOME PAGE');
});

app.listen(port, () => {
  console.log(`App is open on http://localhost:${port}`);
});
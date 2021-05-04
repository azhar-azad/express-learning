const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/rest-api_with_auth_db', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const port = 5000;

app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('REST-API-WITH-AUTH is running');
});

app.listen(port, () => {
  console.log(`App is running at http://localhost:${port}`);
});
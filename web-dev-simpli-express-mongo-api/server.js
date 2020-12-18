require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = 5000;

mongoose.connect(process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

app.use(express.json()); // lets the server to accept json through body or whatever

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers', subscribersRouter); // localhost:5000/subscribers/

app.get('/', (req, res) => {
  console.log('path: /');
  res.send('Hello from homepage');
});

app.listen(5000, () => {
  console.log('Server is running at http://localhost:' + PORT);
});

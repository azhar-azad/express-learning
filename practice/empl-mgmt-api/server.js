import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';

import employeeRouter from './routes/employeeRouter.js';

mongoose.connect('mongodb://localhost/employees', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const PORT = 5000;

app.use(bodyParser.json());

app.use('/employees', employeeRouter);

app.get('/', (req, res) => {
  console.log('path: /');
  res.send('Hello world!');
});

app.listen(PORT, () => {
  console.log('Server running on port: http://localhost:' + PORT);
});
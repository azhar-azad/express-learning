const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const userRouter = require('./user-auth/userRouter');
const orgRouter = require('./routers/orgRouter');
const finAcctRouter = require('./routers/finAccountRouter');
const { authJwt, errorHandler } = require('./helpers/helpers');

const app = express();

// env file read
require('dotenv/config');
const host = process.env.HOST;
const port = process.env.PORT;
const api = process.env.API;
const conn_string = process.env.CONN_STRING;

const api_base_url = `http://${host}:${port}${api}`;

// middlewares
app.use(cors());
app.options('*', cors());
app.use(bodyParser.json());
app.use(morgan('tiny'));
// app.use(authJwt());
app.use(errorHandler);

// routers
app.use(`${api}/users`, userRouter);
app.use(`${api}/organizations`, orgRouter);
app.use(`${api}/finAccounts`, finAcctRouter);

// mongodb connection
mongoose.connect(conn_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Database connection is ready');
}).catch(err => {
  console.log(err);
});

// API up test
app.get(`${api}/test`, (req, res) => {
  res.status(200).json('API is online');
})

// running the server
app.listen(port, () => {
  console.log(`API is online on ${api_base_url}`);
  console.log(`Test if API is online on ${api_base_url}/test`);
});
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const {authJwt, errorHandler} = require('./helpers/helperFunctions');
const productRouter = require('./routers/productRouter');
const categoryRouter = require('./routers/categoryRouter');
const userRouter = require('./routers/userRouter');

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
app.use(authJwt()); // if this middleware is used, every api request have to be made with JWT token
app.use(errorHandler);

// routers
app.use(`${api}/products`, productRouter);
app.use(`${api}/categories`, categoryRouter);
app.use(`${api}/users`, userRouter);

mongoose.connect(conn_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'e_shop_db'
}).then(() => {
  console.log('Database connection is ready');
}).catch((err) => {
    console.log(err);
});

app.listen(port, () => {
  console.log(`API Server is running on ${api_base_url}`);
});
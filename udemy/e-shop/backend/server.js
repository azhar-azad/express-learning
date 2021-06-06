const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');
const host = process.env.HOST;
const port = process.env.PORT;
const api = process.env.API;
const conn_string = process.env.CONN_STRING;

const api_base_url = `http://${host}:${port}${api}`;

app.get(`${api}/`, (req, res) => {
  res.send('hello API!');
});

app.get(`${api}/products`, (req, res) => {
  const product = {
    id: 1,
    name: 'Hair Dresser',
    image: 'some_image_url'
  };
  res.send(product);
});

// mongoose.connect('mongodb://localhost/crud_app_db_3', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
// const db = mongoose.connection;
// db.on('error', error => console.log(error));
// db.once('open', () => console.log('Connected to MongoDB/crud_app_db_3'));
mongoose.connect(conn_string, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'e_shop_db'
}).then(() => console.log('Database connection is ready'))
  .catch((err) => console.log(err));

app.listen(port, () => {
  console.log(`API Server is running on ${api_base_url}`);
});
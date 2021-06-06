const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');

// middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));

require('dotenv/config');
const host = process.env.HOST;
const port = process.env.PORT;
const api = process.env.API;
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

app.listen(port, () => {
  console.log(`API Server is running on ${api_base_url}`);
});
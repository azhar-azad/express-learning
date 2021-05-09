const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const path = require('path');

const connectDB = require('./server/database/connection');

dotenv.config({path: 'config.env'});

const app = express();
const PORT = process.env.PORT || 8080;

// log requests
app.use(morgan('tiny'));

// mongodb connection
connectDB();

// parse request to body-parser
app.use(bodyParser.json());

// set view engine
app.set('view engine', 'ejs');
// app.set('views', path.resolve(__dirname, 'views/home'));

// load assets
app.use('/css', express.static(path.resolve(__dirname, 'assets/css')));
app.use('/img', express.static(path.resolve(__dirname, 'assets/img')));
app.use('/js', express.static(path.resolve(__dirname, 'assets/js')));

// load routers
app.use('/', require('./server/routes/router'));

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}\n`);
});
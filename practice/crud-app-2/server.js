require('./models/db');
const employeeController = require('./controllers/employeeController');
const path = require('path');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');

const express = require('express');

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
})); // this is required to make a post request from a form.
// app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Server is running');
});


// setting and configuring handlebars
app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');


app.use('/employees', employeeController);

app.listen(3000, () => {
    console.log('Server is running at http://localhost:3000');
});
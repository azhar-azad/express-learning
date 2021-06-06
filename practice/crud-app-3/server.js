const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const exphbs = require('express-handlebars');
const path = require('path');

const employeeRouter = require('./routers/employeeRouter');

mongoose.connect('mongodb://localhost/crud_app_db_3', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to MongoDB/crud_app_db_3'));

const app = express();
const port = 5000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/employees', employeeRouter);

app.set('views', path.join(__dirname, '/views/'));
app.engine('hbs', exphbs({
    extname: 'hbs',
    defaultLayout: 'mainLayout',
    layoutsDir: __dirname + '/views/layouts/'
}));
app.set('view engine', 'hbs');

app.get('/test', (req, res) => {
    res.send('HOME PAGE test');
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
    console.log(`Test here at http://localhost:${port}/test`);
})

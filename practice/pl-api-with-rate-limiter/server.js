const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { customRedisRateLimiter } = require('./middlewares/rateLimiter');
const config = require('./config/config');

const parkingLotRouter = require('./routes/parkingLotRouter');

mongoose.connect(`mongodb://localhost/${config.DB_NAME}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const db = mongoose.connection;
db.on('error', error => console.error(error));
db.once('open', () => console.log('Connected to MongoDB'));

const app = express();
const port = config.PORT;

app.use(bodyParser.json());

app.use(customRedisRateLimiter);

app.use('/lot', parkingLotRouter);

app.get('/', (req, res) => {
    res.send('Home Page test');
});

app.listen(port, () => {
    console.log(`App is running at http://localhost:${port}`);
});
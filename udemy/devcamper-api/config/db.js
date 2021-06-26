const mongoose = require('mongoose');

const conn_string = 'mongodb://localhost/devcamper_db';

const connectDB = async () => {
  const conn = await mongoose.connect(conn_string, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  });

  console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline.bold);
};

module.exports = connectDB;
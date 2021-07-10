const path = require('path');
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');
const fileupload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middlewares/error.middleware');
const connectDB = require('./config/db');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const bootcampsRouter = require('./routes/bootcamps.route');
const coursesRouter = require('./routes/courses.route');
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const reviewsRouter = require('./routes/reviews.route');

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev loggin middlewares
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// File uploading
app.use(fileupload());

// Set static folder
// This is needed to access the contents of the folder in the browser
app.use(express.static(path.join(__dirname, 'public')));

// Mount routers
app.use(`/api/v1/bootcamps`, bootcampsRouter);
app.use(`/api/v1/courses`, coursesRouter);
app.use(`/api/v1/auth`, authRouter);
app.use(`/api/v1/users`, usersRouter);
app.use(`/api/v1/reviews`, reviewsRouter);

app.use(errorHandler); // as this handles error in controller methods, it needs to be added after the router call

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold)
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
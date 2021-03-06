const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const colors = require('colors');

const connectDB = require('./config/db');
const errorHandler = require('./middlewares/error.mw');

// Load env vars
dotenv.config({ path: './config/config.env' });

// Connect to database
connectDB();

// Route files
const authRouter = require('./routes/auth.route');
const usersRouter = require('./routes/users.route');
const sectionsRouter = require('./routes/sections.route');
const tagsRouter = require('./routes/tags.route');
const articlesRouter = require('./routes/articles.route');

const app = express();

/** Middlewares Start */

// Body parser
app.use(express.json());

// DEV logging middlewares
if (process.env.APP_ENV === 'development') {
  app.use(morgan('dev'));
}

// Mount routers
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', usersRouter);
app.use('/api/v1/sections', sectionsRouter);
app.use('/api/v1/tags', tagsRouter);
app.use('/api/v1/articles', articlesRouter);

// Handle errors
app.use(errorHandler);

/** Middlewares End */

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.APP_ENV} mode on port ${PORT}`.yellow.bold);
});

// Handle unhandled promise rejection
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});
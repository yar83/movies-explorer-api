const dotenv = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const helmet = require('helmet');
const indexRouter = require('./routes/index');
const errorHandler = require('./middlewares/errors');
const reqValidationErrors = require('./middlewares/reqValidationErrors');
const logger = require('./utils/logger/loggerSettings');
const rateLimit = require('./utils/ratelimiter/ratelimSettings');
const cors = require('./middlewares/cors');
const { devMode } = require('./utils/constants/env');

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.NODE_ENV === 'prod' ? process.env.PROD_DB_URI : devMode.DBURI);

app.use(morgan(logger.logFormat, { stream: logger.logStream }));
app.use(morgan(logger.logFormat, {
  stream: logger.errStream,
  skip: (req, res) => res.statusCode < 400,
}));
app.use(rateLimit);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(cors);
app.use(indexRouter);
app.use(reqValidationErrors);
app.use(errorHandler);

app.listen(port);

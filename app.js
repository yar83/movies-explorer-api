import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from './utils/ratelimiter/ratelimSettings.js';
import indexRouter from './routes/index.js';
import errorHandler from './middlewares/errors.js';
import reqValidationErrors from './middlewares/reqValidationErrors.js';
import logger from './utils/logger/loggerSettings.js';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

// mongoose.connect(process.env.NODE_ENV === 'prod' ? process.env.PROD_DB_URI : 'mongodb://127.0.0.1:27017/moviesdb');
mongoose.connect(process.env.NODE_ENV === 'prod' ? process.env.PROD_DB_URI : 'mongodb://moviesApp:qZVk3Kpvow323s@eternalmovies.nomoredomains.work:27017/moviesdb');

app.use(morgan(logger.logFormat, { stream: logger.logStream }));
app.use(morgan(logger.logFormat, {
  stream: logger.errStream,
  skip: (req, res) => res.statusCode < 400,
}));
app.use(rateLimit);
app.use(helmet());
app.use(cookieParser());
app.use(express.json());
app.use(indexRouter);
app.use(reqValidationErrors);
app.use(errorHandler);

app.listen(port);

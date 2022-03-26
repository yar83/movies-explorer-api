import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import indexRouter from './routes/index.js';
import errorHandler from './middlewares/errors.js';
import reqValidationErrors from './middlewares/reqValidationErrors.js';
import logger from './utils/logs/loggerSettings.js';

dotenv.config();
const port = process.env.PORT || 3000;
const app = express();

mongoose.connect(process.env.NODE_ENV === 'prod' ? process.env.PROD_DB_URI : process.env.DEV_DB_URI);

app.use(morgan(logger.logFormat, { stream: logger.logStream }));
app.use(morgan(logger.logFormat, {
  stream: logger.errStream,
  skip: (req, res) => res.statusCode < 400,
}));

app.use(cookieParser());

app.use(express.json());

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Server will down now');
  }, 0);
});

app.use(indexRouter);

app.use(reqValidationErrors);
app.use(errorHandler);

app.listen(port, () => console.log(`Listening on port ${port}`));

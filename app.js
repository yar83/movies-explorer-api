import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import indexRouter from './routes/index.js';
import errorHandler from './middlewares/errors.js';
import users from './routes/users.js';
import signing from './routes/signing.js';

dotenv.config();

const app = express();

mongoose.connect(process.env.NODE_ENV === 'prod' ? 'mongodb://127.0.0.1:27017/moviesdb' : process.env.DB_URI);

app.use(cookieParser);
app.use(express.json());
// app.use(indexRouter);
app.use('/signup', signing); 
app.use('/users/me', users); 

app.use(errorHandler);

console.log(process.env.DB_URI);
// app.listen(process.env.NODE_ENV === 'prod' ? 3001 : 3000);
app.listen(3100);

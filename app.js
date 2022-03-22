import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();

const app = express();

mongoose.connect(process.env.IS_PROD ? 'mongodb://127.0.0.1:27017/moviesdb' : process.env.DB_URI);

app.listen(process.env.IS_PROD ? 3001 : 3000);

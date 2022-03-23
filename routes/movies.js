import express from 'express';
import Movies from '../controllers/Movies.js';
import CustomError from '../utils/errors/CustomError.js';
import Answer from '../utils/answers/Answer.js';
import movieModel from '../models/movie.js';

const answer = new Answer();
const error = new CustomError();

const movies = new Movies(movieModel, answer, error);
const router = express.Router();

router.post('/', movies.createMovie.bind(movies));
router.get('/', movies.getMovies.bind(movies));
router.delete('/:movieId', movies.deleteMovie.bind(movies));

export default router;

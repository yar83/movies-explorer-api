import express from 'express';
import movies from '../controllers/Movies.js';
import moviesValidator from './middlewares/validation/movies.js';

const router = express.Router();

router.post('/', moviesValidator.validateGetMovies(), movies.createMovie.bind(movies));
router.get('/', moviesValidator.validateGetMovies(), movies.getMovies.bind(movies));
router.delete('/:movieId', moviesValidator.validateDeleteMovie(), movies.deleteMovie.bind(movies));

export default router;

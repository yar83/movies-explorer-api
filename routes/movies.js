import express from 'express';
import movies from '../controllers/Movies.js';

const router = express.Router();

router.post('/', movies.createMovie.bind(movies));
router.get('/', movies.getMovies.bind(movies));
router.delete('/:movieId', movies.deleteMovie.bind(movies));

export default router;

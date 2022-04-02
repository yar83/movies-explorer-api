const express = require('express');
const movies = require('../controllers/Movies');
const moviesValidator = require('./middlewares/validation/movies');

const router = express.Router();

router.post('/', moviesValidator.validateCreateMovie(), movies.createMovie.bind(movies));
router.get('/', movies.getMovies.bind(movies));
router.delete('/:movieId', moviesValidator.validateDeleteMovie(), movies.deleteMovie.bind(movies));

module.exports = router;

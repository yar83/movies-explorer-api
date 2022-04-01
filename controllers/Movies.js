const movieModel = require('../models/movie');
const Answer = require('../utils/answers/Answer');
const CustomError = require('../utils/errors/CustomError');
const errMsg = require('../utils/constants/errors');

class Movies {
  constructor(model, answer, error) {
    this.model = model;
    this.answer = answer;
    this.error = error;
  }

  createMovie(req, res, next) {
    const owner = req.user._id;
    const movieData = { ...req.body, owner };
    this.model.createMovie(movieData)
      .then((movie) => {
        if (movie.length) res.send(this.answer.movieAnswer(movie));
        res.send(movie);
      })
      .catch((err) => next(err));
  }

  getMovies(req, res, next) {
    const owner = req.user._id;
    this.model.getAllUserMovies(owner)
      .then((movies) => res.send(this.answer.moviesAnswer(movies)))
      .catch((err) => next(err));
  }

  deleteMovie(req, res, next) {
    const ownerId = req.user._id;
    const { movieId } = req.params;
    this.model.getMovieById(movieId)
      .then((movie) => {
        if (movie.owner.toString() === ownerId) {
          this.model.deleteMovie(movieId)
            .then((deletedMovie) => res.send(this.answer.movieAnswer(deletedMovie)))
            .catch((err) => next(err));
        } else {
          next(this.error.getCustomError(403, errMsg.noDelOtherPerMovie));
        }
      })
      .catch((err) => next(err));
  }
}

module.exports = new Movies(movieModel, Answer, CustomError);

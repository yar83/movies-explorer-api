import movieModel from '../models/movie.js';
import Answer from '../utils/answers/Answer.js';
import CustomError from '../utils/errors/CustomError.js';

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
      .then((movie) => res.send(this.answer.movieAnswer(movie)))
      .catch((err) => {
        next(this.error.getCustomError(400, this.error.getFullErrMsg(err)));
      });
  }

  getMovies(req, res, next) {
    const owner = req.user._id;
    this.model.getAllUserMovies(owner)
      .then((movies) => {
        res.send(this.answer.moviesAnswer(movies));
      })
      .catch(() => {
        next(this.error.getCustomError(400, 'У пользователя отсутствуют фильмы'));
      });
  }

  deleteMovie(req, res, next) {
    const ownerId = req.user._id;
    const { movieId } = req.params;
    this.model.getMovieById(movieId)
      .then((movie) => {
        if (movie.owner.toString() === ownerId) {
          this.model.deleteMovie(movieId)
            .then((deletedMovie) => res.send(this.answer.movieAnswer(deletedMovie)))
            .catch((err) => {
              next(this.error.getCustomError(409, this.error.getFullErrMsg(err)));
            });
        } else {
          next(this.error.getCustomError(403, 'Нельзя удалять чужие фильмы'));
        }
      })
      .catch(() => {
        next(this.error.getCustomError(400, `В базе нет фильма с id: ${movieId}`));
      });
  }
}

export default new Movies(movieModel, new Answer(), new CustomError());

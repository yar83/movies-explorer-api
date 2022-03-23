export default class Movies {
  constructor(model, answer, error) {
    this.model = model;
    this.answer = answer;
    this.error = error;
  }

  // movie data will send from front without owner
  // ower _id will get from req.user
  createMovie(req, res, next) {
    const owner = req.user._id;
    const movieData = { ...req.body, owner };
    this.model.createMovie(movieData)
      .then((movie) => res.send(this.answer.movieAnswer(movie)))
      .catch((err) => {
        console.log(err);
        next(this.error.errorHandler(405, 'createMovie error'));
      });
  }

  getMovies(req, res, next) {
    const owner = req.user._id;
    this.model.getAllUserMovies(owner)
      .then((movies) => res.send(this.aswer.moviesAnswer(movies)))
      .catch((err) => {
        console.log(err);
        next(this.error.errorHandler(405, 'getMovies error'));
      });
  }

  deleteMovie(req, res, next) {
    const ownerId = req.user._id;
    const movieId = req.params;
    this.model.getMovieById(movieId)
      .then((movie) => {
        if (movie.owner === ownerId) {
          this.model.deleteMovie(movieId)
            .then((deletedMovie) => res.send(this.answer.movieAnswer(deletedMovie)))
            .catch((err) => {
              console.log(err);
              next(this.error.errorHandler(405, 'deletedMovie error last'));
            });
        }
        next(this.error.errorHandler(405, 'Нельзя удалять чужие фильмы'));
      })
      .catch((err) => {
        console.log(err);
        next(this.error.errorHandler(405, 'deletedMovie error last'));
      });
  }
}

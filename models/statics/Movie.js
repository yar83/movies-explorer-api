export default class Movie {
  static createMovie(movieData) {
    return this.create(movieData)
      .then((movie) => movie)
      .catch((err) => err);
  }

  static getMovieById(id) {
    return this.findById(id)
      .orFail(/* error */)
      .then((movie) => movie)
      .catch((err) => err);
  }

  static getAllUserMovies(owner) {
    this.find({ owner })
      .orFail(/* err */)
      .then((movies) => movies)
      .catch((err) => err);
  }

  static deleteMovie(id) {
    return this.findByIdAndDelete(id)
      .orFail(/* error */)
      .then((movie) => movie)
      .catch((err) => err);
  }
}

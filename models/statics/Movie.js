export default class Movie {
  static createMovie(movieData) {
    return this.create(movieData)
      .then((movie) => movie)
      .catch((err) => Promise.reject(err));
  }

  static getMovieById(id) {
    return this.findById(id)
      .orFail()
      .then((movie) => movie)
      .catch((err) => Promise.reject(err));
  }

  static getAllUserMovies(owner) {
    return this.find({ owner })
      .orFail()
      .then((movies) => movies)
      .catch((err) => Promise.reject(err));
  }

  static deleteMovie(id) {
    return this.findByIdAndDelete(id)
      .orFail()
      .then((movie) => movie)
      .catch((err) => Promise.reject(err));
  }
}

const CustErr = require('../../utils/errors/CustomError');
const errMsg = require('../../utils/constants/errors');

module.exports = class Movie {
  static createMovie(movieData) {
    return this.create(movieData)
      .then((movie) => movie)
      .catch((err) => Promise.reject(err));
  }

  static getAllUserMovies(owner) {
    return this.find({ owner })
      .then((movies) => movies)
      .catch((err) => Promise.reject(CustErr.getCustomError(400, CustErr.getFullErrMsg(err))));
  }

  static getMovieById(id) {
    const query = { movieId: id };
    return this.find(query)
      .orFail(CustErr.getCustomError(404, errMsg.movieNotFound(id)))
      .then((movie) => movie)
      .catch((err) => {
        if (err.statusCode === 404) return Promise.reject(err);
        return Promise.reject(CustErr.getCustomError(400, CustErr.getFullErrMsg(err)));
      });
  }

  static deleteMovie(id) {
    return this.findByIdAndDelete(id)
      .orFail(CustErr.getCustomError(404, errMsg.movieNotFound(id)))
      .then((movie) => movie)
      .catch((err) => {
        if (err.statusCode === 404) return Promise.reject(err);
        return Promise.reject(CustErr.getCustomError(400, CustErr.getFullErrMsg(err)));
      });
  }
};

class Answer {
  static userAnswer(user) {
    return ({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  }

  static movieAnswer(movie) {
    return ({
      _id: movie._id,
      country: movie.country,
      director: movie.director,
      duration: movie.duration,
      year: movie.year,
      description: movie.description,
      image: movie.image,
      trailerLInk: movie.trailerLink,
      thumbnail: movie.thumbnail,
      owner: movie.owner,
      movieId: movie.movieId,
      nameRU: movie.nameRU,
      nameEN: movie.nameEN,
    });
  }

  static moviesAnswer(movies) {
    return movies.map((movie) => this.movieAnswer(movie));
  }
}

module.exports = Answer;

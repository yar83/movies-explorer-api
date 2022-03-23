import mongoose from 'mongoose';
import Validator from './shared/Validator.js';
import Movie from './statics/Movie.js';

const { Schema } = mongoose;

const movieSchema = new Schema({
  country: {
    type: String,
    required: [true, 'Страна создания фильма не указана'],
  },

  director: {
    type: String,
    required: [true, 'Режиссёр фильма не указан'],
  },

  duration: {
    type: Number,
    required: [true, 'Длительность фильма не указана'],
  },

  year: {
    type: String,
    required: [true, 'Год выпуска фильма не указан'],
  },

  description: {
    type: String,
    required: [true, 'Описание фильма не указано'],
  },

  image: {
    type: String,
    required: [true, 'Ссылка на постер не указана'],
    validate: {
      validator: Validator.validateURL,
      message: (props) => `${props.value} не является допустимой ссылкой`,
    },
  },

  trailerLInk: {
    type: String,
    requiredPaths: [true, 'Ссылка на трейлер не указана'],
    validate: {
      validator: Validator.validateURL,
      message: (props) => `${props.value} не является допустимой ссылкой`,
    },
  },

  thumbnail: {
    type: String,
    required: [true, 'Постер (миниатюрное изображение) не указан'],
    validate: {
      validator: Validator.validateURL,
      message: (props) => `${props.value} не является допустимой ссылкой`,
    },
  },

  owner: {
    type: mongoose.ObjectId,
    ref: 'user',
    required: [true, 'Id пользователя не указано'],
  },

  movieId: {
    type: mongoose.ObjectId,
    ref: 'MoviesExplorer',
    required: [true, 'Id фильма из БД MoviesExplorer не указано'],
  },

  nameRU: {
    type: String,
    required: [true, 'Русское название фильма не указано'],
  },

  nameEN: {
    type: String,
    required: [true, 'Английское название фильма не указано'],
  },
});

movieSchema.loadClass(Movie);

export default mongoose.model('Movie', movieSchema);

import { celebrate, Joi } from 'celebrate';
import cookieObj from './shares/cookieObj.js';

export default {
  validateCreateMovie: () => celebrate(
    {
      ...cookieObj,
      body: Joi.object().keys({
        country: Joi.string().min(2).max(30).required(),
        director: Joi.string().min(2).max(30).required(),
        duration: Joi.number().integer().greater(1).less(10000).required(),
        year: Joi.string().length(4).required(),
        description: Joi.string().min(1).max(1000).required(),
        image: Joi.string().uri().required(),
        thumbnail: Joi.string().uri().required(),
        movieId: Joi.string().length(24).hex().required(),
        nameRU: Joi.string().min(1).max(100).required(),
        nameEN: Joi.string().min(1).max(100).required(),
      }),
    },
    {
      abortEarly: false,
      messages: {
        'any.required': 'Отсутствует необходимое поле: {#key}',
        'string.min': '{#key} не может быть короче {#limit} символов',
        'string.max': '{#key} не может быть длиннее {#limit} символов',
        'string.hex': '{#key} должно быть шестнадцатиричной строкой',
        'number.base': '{#key} должно быть целым числом',
        'number.greater': '{#key} не может быть меньше {#limit}',
        'number.less': '{#key} не может быть больше {#limit}',
        'object.unknown': 'Недопустимое поле {#label}',
      },
    },
  ),

  validateGetMovies: () => celebrate(
    cookieObj,
    {
      abortEarly: true,
      messages: {
        'any.required': 'Куки токен не предоставлен',
      },
    },
  ),

  validateDeleteMovie: () => celebrate(
    {
      ...cookieObj,
      params: Joi.object().keys({
        movieId: Joi.string().hex().length(24).required(),
      }),
    },
    {
      abortEarly: true,
      messages: {
        'any.required': 'Куки токен не предоставлен',
      },
    },
  ),
};

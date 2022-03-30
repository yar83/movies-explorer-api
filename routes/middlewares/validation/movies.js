import { celebrate, Joi } from 'celebrate';

const validURL = /^(htt(ps|p):\/\/)(www\.)?([-\w+_~]+\.)+\w{2,}(\/?.*)*$/i;

export default {
  validateCreateMovie: () => celebrate(
    {
      body: Joi.object().keys({
        country: Joi.string().min(2).max(30).required(),
        director: Joi.string().min(2).max(30).required(),
        duration: Joi.number().integer().greater(1).less(10000).required(),
        year: Joi.string().length(4).required(),
        description: Joi.string().min(1).max(1000).required(),
        image: Joi.string().pattern(validURL).required(),
        trailerLink:Joi.string().pattern(validURL).required(),
        thumbnail: Joi.string().pattern(validURL).required(),
        movieId: Joi.number().integer().positive().required(),
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
        'string.pattern.base': '{#key} должно быть корректной ссылкой',
        'number.base': '{#key} должно быть целым числом',
        'number.greater': '{#key} не может быть меньше {#limit}',
        'number.less': '{#key} не может быть больше {#limit}',
        'number.positive': '{#key} должен быть целым положительным числом',
        'object.unknown': 'Недопустимое поле {#label}',
      },
    },
  ),

  validateDeleteMovie: () => celebrate(
    {
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

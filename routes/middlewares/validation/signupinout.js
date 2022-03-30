import { celebrate, Joi } from 'celebrate';

export default {
  validateSignup: () => celebrate(
    {
      body: Joi.object().keys({
        name: Joi.string().min(1).max(20).required(),
        email: Joi.string().required().email({
          minDomainSegments: 2,
        }),
        password: Joi.string().min(6).max(20).required(),
      }),
    },
    {
      abortEarly: false,
      messages: {
        'any.required': 'Отсутствует необходимое поле: {#label}',
        'string.email': '{#value} не является допустимым адресом электронной почты',
        'string.min': '{#key} не может быть короче {#limit} символов',
        'string.max': '{#key} не может быть длиннее {#limit} символов',
        'object.unknown': 'Недопустимое поле {#label}',
      },
    },
  ),

  validateSignin: () => celebrate(
    {
      body: Joi.object().keys({
        email: Joi.string().required().email({
          minDomainSegments: 2,
        }),
        password: Joi.string().min(6).max(20).required(),
      }),
    },
    {
      abortEarly: false,
      messages: {
        'any.required': 'Отсутствует необходимое поле: {#label}',
        'string.email': '{#value} не является допустимым адресом электронной почты',
        'string.min': '{#key} не может быть короче {#limit} символов',
        'string.max': '{#key} не может быть длиннее {#limit} символов',
        'object.unknown': 'Недопустимое поле {#label}',
      },
    },
  ),
};

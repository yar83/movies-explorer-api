import { celebrate, Joi } from 'celebrate';
import cookieObj from './shares/cookieObj.js';

export default {
  validateGetUser: () => celebrate(
    cookieObj,
    {
      abortEarly: true,
      messages: {
        'any.required': '{#path}, {#key} Куки токен не предоставлен',
      },
    },
  ),

  validateUpdateUser: () => celebrate(
    {
      ...cookieObj,
      body: Joi.object().keys({
        name: Joi.string().min(1).max(20).required(),
        email: Joi.string().required().email({
          minDomainSegments: 2,
        }),
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

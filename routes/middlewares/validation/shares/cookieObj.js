import { Joi } from 'celebrate';

export default {
  cookies: Joi.object().keys({
    token: Joi.string().required(),
    'Max-Age': Joi.string().required(),
    Domain: Joi.string().required(),
    Path: Joi.string().required(),
    Expires: Joi.string().required(),
    SameSite: Joi.string().required(),
  }),
};

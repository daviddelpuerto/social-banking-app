/* eslint-disable import/prefer-default-export */

import {
  celebrate, celebrateOptions, Joi, Segments,
} from '../../../Shared/infrastructure/CelebrateValidator';

export const validateCreateUser = celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    age: Joi.number().min(18).max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(14).required()
      .regex(/(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{14,}$/)
      .message('Password should contain at least one letter, one number and one special character'),
    balance: Joi.number().required(),
  }),
}, celebrateOptions);

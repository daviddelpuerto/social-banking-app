/* eslint-disable import/prefer-default-export */

import {
  celebrate, celebrateOptions, Joi, Segments,
} from '../../../Shared/infrastructure/CelebrateValidator';

export const validateCreateTransaction = celebrate({
  [Segments.BODY]: Joi.object().keys({
    receiverAccount: Joi.string().required(),
    balance: Joi.number().required(),
  }),
}, celebrateOptions);

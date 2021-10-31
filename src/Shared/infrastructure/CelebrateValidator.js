import { celebrate, Joi, Segments } from 'celebrate';

const celebrateOptions = {
  abortEarly: false,
  allowUnknown: true,
};

export {
  celebrate,
  celebrateOptions,
  Joi,
  Segments,
};

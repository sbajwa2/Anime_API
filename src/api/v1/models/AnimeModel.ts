import Joi from 'joi';

export const animeSchema = Joi.object({
  title: Joi.string().min(1).required(),
  genre: Joi.string().min(1).required()
});

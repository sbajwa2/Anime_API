import Joi from 'joi';

export const reviewSchema = Joi.object({
  animeId: Joi.number().required(),
  userId: Joi.number().required(),
  rating: Joi.number().min(1).max(5).required(),
  comment: Joi.string().allow('').optional()
});

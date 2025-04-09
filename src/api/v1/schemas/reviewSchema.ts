import Joi from 'joi';

// Define the review schema
export const reviewSchema = Joi.object({
  userId: Joi.number().integer().required().messages({
    'number.base': 'User ID must be a number',
    'number.integer': 'User ID must be an integer',
    'any.required': 'User ID is required',
  }),
  animeId: Joi.number().integer().required().messages({
    'number.base': 'Anime ID must be a number',
    'number.integer': 'Anime ID must be an integer',
    'any.required': 'Anime ID is required',
  }),
  rating: Joi.number().min(1).max(5).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 1',
    'number.max': 'Rating must be less than or equal to 5',
    'any.required': 'Rating is required',
  }),
  review: Joi.string().min(10).max(1000).optional().messages({
    'string.base': 'Review must be a string',
    'string.min': 'Review must be at least 10 characters long',
    'string.max': 'Review must be less than 1000 characters',
  }),
});

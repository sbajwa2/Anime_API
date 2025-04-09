import Joi from 'joi';

// Define the anime schema
export const animeSchema = Joi.object({
  title: Joi.string().min(3).max(200).required().messages({
    'string.base': 'Title must be a string',
    'string.min': 'Title must be at least 3 characters long',
    'string.max': 'Title must be less than 200 characters',
    'any.required': 'Title is required',
  }),
  genre: Joi.string().min(3).max(50).required().messages({
    'string.base': 'Genre must be a string',
    'string.min': 'Genre must be at least 3 characters long',
    'string.max': 'Genre must be less than 50 characters',
    'any.required': 'Genre is required',
  }),
  rating: Joi.number().min(0).max(10).required().messages({
    'number.base': 'Rating must be a number',
    'number.min': 'Rating must be at least 0',
    'number.max': 'Rating must be less than or equal to 10',
    'any.required': 'Rating is required',
  }),
});

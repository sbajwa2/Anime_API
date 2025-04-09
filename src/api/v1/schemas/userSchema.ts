import Joi from 'joi';

// Define the user schema
export const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required().messages({
    'string.base': 'Name must be a string',
    'string.min': 'Name must be at least 3 characters long',
    'string.max': 'Name must be less than 100 characters',
    'any.required': 'Name is required',
  }),
  email: Joi.string().email().required().messages({
    'string.base': 'Email must be a string',
    'string.email': 'Email must be a valid email address',
    'any.required': 'Email is required',
  }),
  age: Joi.number().integer().min(18).max(120).required().messages({
    'number.base': 'Age must be a number',
    'number.integer': 'Age must be an integer',
    'number.min': 'Age must be at least 18',
    'number.max': 'Age must be less than 120',
    'any.required': 'Age is required',
  }),
});

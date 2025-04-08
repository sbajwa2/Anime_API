import Joi from 'joi';

export const userSchema = Joi.object({
  username: Joi.string().min(3).required()
});

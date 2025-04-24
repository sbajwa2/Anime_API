import { Request, Response, NextFunction } from 'express';
import { BadRequestError } from '../errors/errors';  // Assuming you have a custom error class

/**
 * A simple validation middleware to check required fields in the request body.
 * This can be extended to include more complex validations.
 */
export const validateUserCreation = (req: Request, res: Response, next: NextFunction) => {
  const { username } = req.body;

  // Basic validation: Check if username is provided
  if (!username || typeof username !== 'string' || username.trim().length === 0) {
    return next(new BadRequestError('Username is required and must be a non-empty string.'));
  }

  next();
};

/**
 * Example for validating anime creation (you can add more fields or checks as necessary)
 */
export const validateAnimeCreation = (req: Request, res: Response, next: NextFunction) => {
  const { title, genre } = req.body;

  // Check if title and genre are provided and are valid strings
  if (!title || typeof title !== 'string' || title.trim().length === 0) {
    return next(new BadRequestError('Title is required and must be a non-empty string.'));
  }

  if (!genre || typeof genre !== 'string' || genre.trim().length === 0) {
    return next(new BadRequestError('Genre is required and must be a non-empty string.'));
  }

  next();
};

/**
 * Example of validation for review creation (rating must be between 1 and 5)
 */
export const validateReviewCreation = (req: Request, res: Response, next: NextFunction) => {
  const { animeId, userId, rating, comment } = req.body;

  // Basic validations for required fields
  if (!animeId || !userId || typeof rating !== 'number') {
    return next(new BadRequestError('Anime ID, user ID, and rating are required.'));
  }

  // Validate the rating to be between 1 and 5
  if (rating < 1 || rating > 5) {
    return next(new BadRequestError('Rating must be between 1 and 5.'));
  }

  // Optional: Validate comment length
  if (comment && comment.length > 500) {
    return next(new BadRequestError('Comment cannot exceed 500 characters.'));
  }

  next();
};

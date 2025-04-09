import Joi from 'joi';

// Review Interface
export interface Review {
  id?: string; // Firestore document ID
  animeId: string;
  userId: string;
  rating: number;
  comment?: string;
}

// Joi Validation Schema for Review
export const reviewSchema = Joi.object<Review>({
  animeId: Joi.string().required(),
  userId: Joi.string().required(),
  rating: Joi.number().min(1).max(10).required(),
  comment: Joi.string().allow('').optional(),
});

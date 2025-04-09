import Joi from 'joi';

// Anime Interface
export interface Anime {
  id?: string; // Firestore document ID
  title: string;
  genre: string;
  rating?: number; // Optional average rating
}

// Joi Validation Schema for Anime
export const animeSchema = Joi.object<Anime>({
  title: Joi.string().min(1).required(),
  genre: Joi.string().min(1).required(),
  rating: Joi.number().min(0).max(10).optional(), // Optional on create
});

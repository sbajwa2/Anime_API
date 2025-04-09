import { db } from '../../../../config/firebase'; 
import { Review } from '../models/ReviewModel';
import { BadRequestError, NotFoundError } from '../errors/errors';

// Function to get all reviews for an anime
export const getReviewsByAnimeId = async (animeId: string): Promise<Review[]> => {
  try {
    const reviewsSnapshot = await db.collection('reviews').where('animeId', '==', animeId).get();
    const reviews: Review[] = [];
    reviewsSnapshot.forEach((doc) => {
      reviews.push({ id: doc.id, ...doc.data() } as Review);
    });
    return reviews;
  } catch (error) {
    throw new Error('Error retrieving reviews');
  }
};

export const createReview = async (animeId: string, userId: string, rating: number, comment: string): Promise<Review> => {
  try {
    if (!animeId || !userId || !rating) {
      throw new BadRequestError('Anime ID, user ID, and rating are required');
    }
    
    const newReviewRef = await db.collection('reviews').add({
      animeId,
      userId,
      rating,
      comment,
      createdAt: new Date(),
    });
    const newReview = {
      id: newReviewRef.id,
      animeId,
      userId,
      rating,
      comment,
    };
    return newReview;
  } catch (error) {
    throw new Error('Error creating review');
  }
};

export const deleteReview = async (reviewId: string): Promise<void> => {
  try {
    const reviewDoc = await db.collection('reviews').doc(reviewId).get();
    
    if (!reviewDoc.exists) {
      throw new NotFoundError('Review not found');
    }
    
    await db.collection('reviews').doc(reviewId).delete();
  } catch (error) {
    throw new Error('Error deleting review');
  }
};

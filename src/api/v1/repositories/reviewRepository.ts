import { Review } from '../types/Review';

let reviews: Review[] = [];
let nextReviewId = 1;

export const getReviews = () => reviews;

export const addReview = (reviewData: Omit<Review, 'id'>): Review => {
  const newReview: Review = { id: nextReviewId++, ...reviewData };
  reviews.push(newReview);
  return newReview;
};

export const updateReviewById = (id: number, updates: Partial<Review>): Review | null => {
  const index = reviews.findIndex(review => review.id === id);
  if (index === -1) return null;
  reviews[index] = { ...reviews[index], ...updates };
  return reviews[index];
};

export const deleteReviewById = (id: number): boolean => {
  const originalLength = reviews.length;
  reviews = reviews.filter(review => review.id !== id);
  return reviews.length < originalLength;
};

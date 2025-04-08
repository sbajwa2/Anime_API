import { Request, Response, NextFunction } from 'express';
import { Review } from '../types/Review';
import { reviewSchema } from '../models/ReviewModel';

let reviews: Review[] = [];
let nextReviewId = 1;

export const getAllReviews = (req: Request, res: Response) => {
  res.status(200).json({ reviews });
};

export const createReview = async (req: Request, res: Response, next: NextFunction) => {
  
    res.status(201).json({ message: 'Review created successfully' });
  } 
 

export const updateReview = async (req: Request, res: Response, next: NextFunction) => {
  
    res.status(200).json({ message: 'Review updated successfully'});
  } 

export const deleteReview = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    reviews = reviews.filter(review => review.id !== id);
    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    next(error);
  }
};

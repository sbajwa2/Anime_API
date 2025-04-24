import { Request, Response, NextFunction } from 'express';

// Global error handling middleware
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack); // Log the error stack for debugging

  // Check if error is a custom error (like BadRequestError, NotFoundError, etc.)
  if (err.name && err.name === 'BadRequestError') {
    return res.status(400).json({ message: err.message });
  }

  if (err.name && err.name === 'NotFoundError') {
    return res.status(404).json({ message: err.message });
  }

  // For unexpected errors, send a generic 500 response
  return res.status(500).json({ message: 'Something went wrong, please try again later' });
};

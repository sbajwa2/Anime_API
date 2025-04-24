// errorUtils.ts

// Custom error class for handling different HTTP status codes
export class AppError extends Error {
    public statusCode: number;
    public isOperational: boolean;
    
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true;  // marks the error as operational
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // Utility function to handle async errors in controllers
  export const catchAsync = (fn: Function) => {
    return (req: any, res: any, next: any) => {
      fn(req, res, next).catch((err: any) => next(err));
    };
  };
  
  // Middleware to handle errors
  export const errorHandler = (err: any, req: any, res: any, next: any) => {
    // If the error is operational, send the message and status code
    if (err.isOperational) {
      return res.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      });
    }
  
    // If it's not operational, it's likely a programming error
    console.error('ERROR', err); // log the error details for internal debugging
    
    return res.status(500).json({
      status: 'error',
      message: 'Something went wrong!',
    });
  };
  
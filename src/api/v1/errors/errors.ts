// Custom Error Handling Utility

// Define custom error classes for different error types
export class AppError extends Error {
    statusCode: number;
    isOperational: boolean;
  
    constructor(message: string, statusCode: number) {
      super(message);
      this.statusCode = statusCode;
      this.isOperational = true; // Set to true for known errors (like validation)
      Error.captureStackTrace(this, this.constructor);
    }
  }
  
  // 404 Not Found Error
  export class NotFoundError extends AppError {
    constructor(message: string = 'Resource not found') {
      super(message, 404);
    }
  }
  
  // 400 Bad Request Error (e.g., invalid input or data)
  export class BadRequestError extends AppError {
    constructor(message: string = 'Bad request') {
      super(message, 400);
    }
  }
  
  // 401 Unauthorized Error (e.g., authentication failure)
  export class UnauthorizedError extends AppError {
    constructor(message: string = 'Unauthorized') {
      super(message, 401);
    }
  }
  
  // 403 Forbidden Error (e.g., insufficient privileges)
  export class ForbiddenError extends AppError {
    constructor(message: string = 'Forbidden') {
      super(message, 403);
    }
  }
  
  // 500 Internal Server Error (e.g., unhandled server error)
  export class InternalServerError extends AppError {
    constructor(message: string = 'Internal server error') {
      super(message, 500);
    }
  }
  
  // Utility function to handle errors in Express
  export const errorHandler = (
    err: AppError,
    req: any,
    res: any,
    next: any
  ) => {
    console.error(err); // Log the error to the server logs
  
    // Default response for unhandled errors
    res.status(err.statusCode || 500).json({
      status: 'error',
      message: err.message || 'Something went wrong',
    });
  };
  
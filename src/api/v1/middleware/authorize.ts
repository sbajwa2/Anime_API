import { Request, Response, NextFunction } from 'express';

// Extend the Request interface to include `user` property
interface CustomRequest extends Request {
  user?: { [key: string]: any };  // This is where the decoded token will be attached
}

// Middleware to authorize the user based on their role
export const authorize = (role: string) => {
  return (req: CustomRequest, res: Response, next: NextFunction): void => {
    if (!req.user) {
      res.status(401).json({ message: 'Unauthorized access, no user found' });
      return;  // Prevent further execution of the middleware chain
    }

    if (req.user.role !== role) {
      res.status(403).json({ message: 'Forbidden: Insufficient permissions' });
      return;  // Prevent further execution of the middleware chain
    }

    next();  // Proceed to the next middleware or route handler
  };
};

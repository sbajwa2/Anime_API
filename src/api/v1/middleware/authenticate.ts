import { Request, Response, NextFunction } from 'express';
import { auth } from '../../../../config/firebase';  // Assuming the firebase config is in config/firebase.ts

// Extend the Request interface to include `user` property
interface CustomRequest extends Request {
  user?: { [key: string]: any };  // This is where the decoded token will be attached
}

// Middleware to authenticate user by verifying Firebase ID token
export const authenticate = async (req: CustomRequest, res: Response, next: NextFunction): Promise<void> => {
  const idToken = req.headers.authorization?.split('Bearer ')[1]; // Get token from Authorization header

  if (!idToken) {
    res.status(401).json({ message: 'Authentication token is missing' });
    return;  // We return here to prevent the rest of the code from executing
  }

  try {
    // Verify the ID token using Firebase Auth
    const decodedToken = await auth.verifyIdToken(idToken);
    req.user = decodedToken; // Attach decoded token to the request object (can be used in routes)
    next();  // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized access, invalid token' });
  }
};

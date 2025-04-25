import { authenticate } from '../src/api/v1/middleware/authenticate'; // adjust path as needed
import { Request, Response, NextFunction } from 'express';
import { auth } from '../config/firebase'; // adjust path as needed

jest.mock('../config/firebase', () => ({
  auth: {
    verifyIdToken: jest.fn(),
  },
}));

describe('authenticate middleware', () => {
  let req: Partial<Request>;
  let res: Partial<Response>;
  let next: NextFunction;

  beforeEach(() => {
    req = {
      headers: {}
    };
    res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    next = jest.fn();
  });

  it('should return 401 if token is missing', async () => {
    await authenticate(req as Request, res as Response, next);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication token is missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if token is invalid', async () => {
    req.headers = {
      authorization: 'Bearer invalidtoken',
    };
    (auth.verifyIdToken as jest.Mock).mockRejectedValue(new Error('Invalid token'));

    await authenticate(req as Request, res as Response, next);

    expect(auth.verifyIdToken).toHaveBeenCalledWith('invalidtoken');
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized access, invalid token' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if Authorization header is malformed', async () => {
    req.headers = {
      authorization: 'invalidHeaderFormat',
    };
  
    await authenticate(req as Request, res as Response, next);
  
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication token is missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should return 401 if Bearer token is empty', async () => {
    req.headers = {
      authorization: 'Bearer ',
    };
  
    await authenticate(req as Request, res as Response, next);
  
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Authentication token is missing' });
    expect(next).not.toHaveBeenCalled();
  });

  it('should handle unexpected errors during verification', async () => {
    req.headers = {
      authorization: 'Bearer sometoken',
    };
    (auth.verifyIdToken as jest.Mock).mockImplementation(() => {
      throw new Error('Firebase exploded');
    });
  
    await authenticate(req as Request, res as Response, next);
  
    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({ message: 'Unauthorized access, invalid token' });
  });  
  
  it('should call next if token is valid', async () => {
    req.headers = {
      authorization: 'Bearer validtoken',
    };
    const decoded = { uid: '1234', email: 'test@example.com' };
    (auth.verifyIdToken as jest.Mock).mockResolvedValue(decoded);

    await authenticate(req as Request, res as Response, next);

    expect(auth.verifyIdToken).toHaveBeenCalledWith('validtoken');
    expect((req as any).user).toEqual(decoded);
    expect(next).toHaveBeenCalled();
    expect(res.status).not.toHaveBeenCalled();
    expect(res.json).not.toHaveBeenCalled();
  });
});

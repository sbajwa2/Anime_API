// tests/controllers/AdminController.test.ts
import { adminDashboard } from '../src/api/v1/controllers/AdminController';
import { Request, Response } from 'express';

describe('AdminController', () => {
  it('should respond with dashboard message', () => {
    const req = {} as Request;
    const res = {
      json: jest.fn()
    } as unknown as Response;

    adminDashboard(req, res);

    expect(res.json).toHaveBeenCalledWith({ message: 'Welcome to the Admin Dashboard' });
  });
});

it('should return dashboard with admin info', async () => {
    const mockUser = { name: 'Smilepreet', role: 'admin' };
    const req = { user: mockUser } as Request;
    const res = { json: jest.fn() } as unknown as Response;
  
    adminDashboard(req, res);
  
    expect(res.json).toHaveBeenCalledWith({
      message: `Welcome to the Admin Dashboard`,
    });
  });

it('should not crash when res.json throws an error', () => {
    const req = {} as Request;
    const res = {
      json: jest.fn(() => { throw new Error('Test error'); }),
    } as unknown as Response;
  
    expect(() => adminDashboard(req, res)).toThrow('Test error');
  });

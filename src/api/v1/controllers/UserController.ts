import { Request, Response, NextFunction } from 'express';
import { User } from '../types/User';
import { userSchema } from '../schemas/userSchema';

let users: User[] = [];
let nextId = 1;

export const getAllUsers = (req: Request, res: Response, next: NextFunction) => {
  try {
    res.status(200).json({ users });
  } catch (error) {
    next(error); 
  }
};

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  
    res.status(201).json({ message: 'User created successfully'});
  } 

export const updateUser = (req: Request, res: Response, next: NextFunction) => {
  
    res.status(200).json({ message: 'User updated successfully' });
  } 

export const deleteUser = (req: Request, res: Response, next: NextFunction) => {
  try {
    const id = Number(req.params.id);
    users = users.filter(user => user.id !== id);
    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    next(error); 
  }
};

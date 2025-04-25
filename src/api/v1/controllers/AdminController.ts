import { Request, Response } from 'express';

export const adminDashboard = (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the Admin Dashboard' });
};

export const manageUsers = (req: Request, res: Response) => {
  res.json({ message: 'Here you can manage users' });
};

export const manageAnime = (req: Request, res: Response) => {
  res.json({ message: 'Here you can manage anime content' });
};

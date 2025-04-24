import { Request, Response } from 'express';

export const moderatorDashboard = (req: Request, res: Response) => {
    res.status(200).json({ message: 'Welcome to the Moderator Dashboard' });
};

export const reviewContent = (req: Request, res: Response) => {
  res.json({ message: 'Review user-generated content here' });
};

export const flagContent = (req: Request, res: Response) => {
  res.json({ message: 'Content flagged successfully' });
};

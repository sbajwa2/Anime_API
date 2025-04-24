import { Request, Response } from 'express';

export const getViewerDashboard = (req: Request, res: Response) => {
  res.status(200).json({ message: 'Welcome to the Viewer Dashboard' });
};

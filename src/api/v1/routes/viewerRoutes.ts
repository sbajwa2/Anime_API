import express from 'express';
import { getViewerDashboard } from '../controllers/ViewerController';

const router = express.Router();

router.get('/dashboard', getViewerDashboard);

export default router;

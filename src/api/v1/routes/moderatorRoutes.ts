import { Router } from 'express';
import { moderatorDashboard, reviewContent, flagContent } from '../controllers/ModeratorController';

const router = Router();

router.get('/dashboard', moderatorDashboard);
router.get('/review', reviewContent);
router.post('/flag', flagContent);

export default router;

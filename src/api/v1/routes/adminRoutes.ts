import { Router } from 'express';
import { adminDashboard, manageUsers, manageAnime } from '../controllers/AdminController';

const router = Router();

router.get('/dashboard', adminDashboard);
router.get('/users', manageUsers);
router.get('/anime', manageAnime);

export default router;

import { Router } from 'express';
import {
  getAllAnime,
  createAnime,
  updateAnime,
  deleteAnime
} from '../controllers/AnimeController';

const router = Router();

router.get('/', getAllAnime);
router.post('/', createAnime);
router.put('/:id', updateAnime);
router.delete('/:id', deleteAnime);

export default router;

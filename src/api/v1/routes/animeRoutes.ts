import { Router } from 'express';
import {
  getAllAnime,
  createAnime,
  updateAnime,
  deleteAnime
} from '../controllers/AnimeController';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Anime
 *   description: Anime management API
 */

/**
 * @swagger
 * /api/v1/anime:
 *   get:
 *     summary: Get all anime
 *     tags: [Anime]
 *     responses:
 *       200:
 *         description: List of anime
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 anime:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       title:
 *                         type: string
 *                       genre:
 *                         type: string
 *                       rating:
 *                         type: number
 */
router.get('/', getAllAnime); // No authentication or authorization needed for fetching all anime

/**
 * @swagger
 * /api/v1/anime:
 *   post:
 *     summary: Create a new anime
 *     tags: [Anime]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - genre
 *               - rating
 *             properties:
 *               title:
 *                 type: string
 *                 example: Naruto
 *               genre:
 *                 type: string
 *                 example: Action
 *               rating:
 *                 type: number
 *                 example: 8.5
 *     responses:
 *       201:
 *         description: Anime created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Anime created successfully
 *                 anime:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     title:
 *                       type: string
 *                       example: Naruto
 *                     genre:
 *                       type: string
 *                       example: Action
 *                     rating:
 *                       type: number
 *                       example: 8.5
 */
router.post('/', authenticate, authorize('admin'), createAnime); // Add authentication and admin authorization

/**
 * @swagger
 * /api/v1/anime/{id}:
 *   put:
 *     summary: Update an existing anime
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Anime ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               genre:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Anime updated successfully
 */
router.put('/:id', authenticate, authorize('admin'), updateAnime); // Add authentication and admin authorization

/**
 * @swagger
 * /api/v1/anime/{id}:
 *   delete:
 *     summary: Delete an anime by ID
 *     tags: [Anime]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Anime ID
 *     responses:
 *       200:
 *         description: Anime deleted successfully
 */
router.delete('/:id', authenticate, authorize('admin'), deleteAnime); // Add authentication and admin authorization

export default router;

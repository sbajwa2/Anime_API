import { Router } from 'express';
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/ReviewsController';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: API for managing reviews
 */

/**
 * @swagger
 * /api/v1/reviews:
 *   get:
 *     summary: Get all reviews
 *     tags: [Reviews]
 *     responses:
 *       200:
 *         description: List of reviews
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 reviews:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                       animeId:
 *                         type: integer
 *                       reviewer:
 *                         type: string
 *                       comment:
 *                         type: string
 *                       rating:
 *                         type: number
 */
router.get('/', getAllReviews);

/**
 * @swagger
 * /api/v1/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - animeId
 *               - reviewer
 *               - comment
 *               - rating
 *             properties:
 *               animeId:
 *                 type: integer
 *                 example: 1
 *               reviewer:
 *                 type: string
 *                 example: Smiley
 *               comment:
 *                 type: string
 *                 example: Amazing anime!
 *               rating:
 *                 type: number
 *                 example: 9.5
 *     responses:
 *       201:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review created successfully
 *                 review:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: integer
 *                       example: 1
 *                     animeId:
 *                       type: integer
 *                       example: 1
 *                     reviewer:
 *                       type: string
 *                       example: Smiley
 *                     comment:
 *                       type: string
 *                       example: Amazing anime!
 *                     rating:
 *                       type: number
 *                       example: 9.5
 */
router.post('/', createReview);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   put:
 *     summary: Update an existing review
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               comment:
 *                 type: string
 *               rating:
 *                 type: number
 *     responses:
 *       200:
 *         description: Review updated successfully
 */
router.put('/:id', updateReview);

/**
 * @swagger
 * /api/v1/reviews/{id}:
 *   delete:
 *     summary: Delete a review by ID
 *     tags: [Reviews]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Review ID
 *     responses:
 *       200:
 *         description: Review deleted successfully
 */
router.delete('/:id', deleteReview);

export default router;

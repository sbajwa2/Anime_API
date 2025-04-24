import { Router } from 'express';
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview
} from '../controllers/ReviewsController';
import { authenticate } from '../middleware/authenticate';
import { authorize } from '../middleware/authorize';

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
 *     security:
 *       - BearerAuth: []
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
 *       401:
 *         description: Unauthorized (User not authenticated)
 *       403:
 *         description: Forbidden (User not authorized)
 */
router.get('/', authenticate, authorize('user'), getAllReviews);

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
 *       400:
 *         description: Bad request (Invalid input)
 *       401:
 *         description: Unauthorized (User not authenticated)
 *       403:
 *         description: Forbidden (User not authorized)
 */
router.post('/', authenticate, authorize('user'), createReview);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review updated successfully
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
 *       400:
 *         description: Bad request (Invalid input)
 *       404:
 *         description: Not Found (Review not found)
 *       401:
 *         description: Unauthorized (User not authenticated)
 *       403:
 *         description: Forbidden (User not authorized)
 */
router.put('/:id', authenticate, authorize('user'), updateReview);

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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: Review deleted successfully
 *       404:
 *         description: Not Found (Review not found)
 *       401:
 *         description: Unauthorized (User not authenticated)
 *       403:
 *         description: Forbidden (User not authorized)
 */
router.delete('/:id', authenticate, authorize('user'), deleteReview);

export default router;

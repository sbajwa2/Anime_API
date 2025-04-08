import request from 'supertest';
import express from 'express';
import { getAllReviews, createReview, updateReview, deleteReview } from '../src/api/v1/controllers/ReviewsController'; // Adjust the import based  your file structure

const app = express();
app.use(express.json()); // To parse JSON bodies

// Use the controller functions
app.get('/reviews', getAllReviews);
app.post('/reviews', createReview);
app.put('/reviews/:id', updateReview);
app.delete('/reviews/:id', deleteReview);

describe('Review Controller Tests', () => {

  it('should get all reviews', async () => {
    const response = await request(app).get('/reviews');
    expect(response.status).toBe(200);
    expect(response.body.reviews).toBeDefined();
  });

  it('should create a review', async () => {
    const response = await request(app)
      .post('/reviews')
      .send({
        userId: 1,
        animeId: 101,
        reviewText: 'Great anime, loved the characters!',
        rating: 9
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Review created successfully');
  });

  it('should update a review', async () => {
    // Assuming a review exists with id 1 for testing
    const response = await request(app)
      .put('/reviews/1')
      .send({
        userId: 1,
        animeId: 101,
        reviewText: 'Amazing anime, with a fantastic storyline!',
        rating: 10
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review updated successfully');
  });

  it('should delete a review', async () => {
    // Assuming a review exists with id 1 for testing
    const response = await request(app).delete('/reviews/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Review deleted successfully');
  });
});

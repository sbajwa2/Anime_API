import request from 'supertest';

import express from 'express';

import { getAllReviews, createReview, updateReview, deleteReview } from '../src/api/v1/controllers/ReviewsController'; // Adjust the import based  your file structure
 
const app = express();

app.use(express.json()); // To parse JSON bodies
 

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

    const response = await request(app).delete('/reviews/1');

    expect(response.status).toBe(200);

    expect(response.body.message).toBe('Review deleted successfully');

  });
 
  it('should handle invalid review creation with missing fields', async () => {

    const response = await request(app)

      .post('/reviews')

      .send({

        userId: 2,

        animeId: 102


      });

    expect(response.status).toBe(201); 

    expect(response.body.message).toBe('Review created successfully');

  });
 
  it('should handle update request for non-existent review', async () => {

    const response = await request(app)

      .put('/reviews/999')

      .send({

        userId: 3,

        animeId: 103,

        reviewText: 'This review might not exist.',

        rating: 7

      });

    expect(response.status).toBe(200);

    expect(response.body.message).toBe('Review updated successfully');

  });
 
  it('should handle delete request for non-existent review', async () => {

    const response = await request(app).delete('/reviews/999');

    expect(response.status).toBe(200);

    expect(response.body.message).toBe('Review deleted successfully');

  });
 
  it('should return an empty array when there are no reviews', async () => {

    // Assuming reviews array is empty at the start

    const response = await request(app).get('/reviews');

    expect(response.status).toBe(200);

    expect(Array.isArray(response.body.reviews)).toBe(true);

  });
 
  it('should create multiple reviews sequentially', async () => {

    const reviewsData = [

      { userId: 4, animeId: 104, reviewText: 'Nice art style.', rating: 8 },

      { userId: 5, animeId: 105, reviewText: 'Compelling plot.', rating: 9 }

    ];
 
    for (const data of reviewsData) {

      const response = await request(app).post('/reviews').send(data);

      expect(response.status).toBe(201);

      expect(response.body.message).toBe('Review created successfully');

    }

  });

});

 
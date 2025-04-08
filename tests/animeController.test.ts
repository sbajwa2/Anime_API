import request from 'supertest';
import express from 'express';
import { getAllAnime, createAnime, updateAnime, deleteAnime } from '../src/api/v1/controllers/AnimeController'; // Adjust the import based on your file structure

const app = express();
app.use(express.json()); // To parse JSON bodies

// Use the controller functions
app.get('/anime', getAllAnime);
app.post('/anime', createAnime);
app.put('/anime/:id', updateAnime);
app.delete('/anime/:id', deleteAnime);

describe('Anime Controller Tests', () => {
  it('should get all anime', async () => {
    const response = await request(app).get('/anime');
    expect(response.status).toBe(200);
    expect(response.body.anime).toBeDefined();
  });

  it('should create an anime', async () => {
    const response = await request(app)
      .post('/anime')
      .send({
        title: 'Naruto',
        genre: 'Action',
        rating: 8.5
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('Anime created successfully');
  });

  it('should update an anime', async () => {
    // Assume an anime exists with id 1 for testing
    const response = await request(app)
      .put('/anime/1')
      .send({
        title: 'Naruto Shippuden',
        genre: 'Action',
        rating: 9.0
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Anime updated successfully');
  });

  it('should delete an anime', async () => {
    // Assume an anime exists with id 1 for testing
    const response = await request(app).delete('/anime/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('Anime deleted successfully');
  });
});

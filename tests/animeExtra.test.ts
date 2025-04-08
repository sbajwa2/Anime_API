import request from 'supertest';
import express from 'express';
import { getAllAnime, createAnime, updateAnime, deleteAnime } from '../src/api/v1/controllers/AnimeController'; // Adjust path as needed

const app = express();
app.use(express.json());

// Anime routes
app.get('/anime', getAllAnime);
app.post('/anime', createAnime);
app.put('/anime/:id', updateAnime);
app.delete('/anime/:id', deleteAnime);

describe('Additional Anime Controller Tests', () => {
  it('should initially return an empty anime list', async () => {
    const res = await request(app).get('/anime');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body.anime)).toBe(true);
  });

  it('should create a new anime - One Piece', async () => {
    const res = await request(app).post('/anime').send({
      title: 'One Piece',
      genre: 'Adventure',
      rating: 9.2
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Anime created successfully');
  });

  it('should create another anime - Attack on Titan', async () => {
    const res = await request(app).post('/anime').send({
      title: 'Attack on Titan',
      genre: 'Dark Fantasy',
      rating: 9.8
    });
    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Anime created successfully');
  });

  it('should update an existing anime - ID 2', async () => {
    const res = await request(app).put('/anime/2').send({
      title: 'Attack on Titan: Final Season',
      genre: 'Dark Fantasy',
      rating: 9.9
    });
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Anime updated successfully');
  });

  it('should delete an anime - ID 2', async () => {
    const res = await request(app).delete('/anime/2');
    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Anime deleted successfully');
  });
});

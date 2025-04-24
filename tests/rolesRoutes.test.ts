import request from 'supertest';
import express from 'express';
import adminRoutes from '../src/api/v1/routes/adminRoutes';
import viewerRoutes from '../src/api/v1/routes/viewerRoutes';
import moderatorRoutes from '../src/api/v1/routes/moderatorRoutes';

const app = express();
app.use('/admin', adminRoutes);
app.use('/viewer', viewerRoutes);
app.use('/moderator', moderatorRoutes);

describe('Role Routes Integration Tests', () => {
  it('GET /admin/dashboard should return admin message', async () => {
    const res = await request(app).get('/admin/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Welcome to the Admin Dashboard' });
  });

  it('GET /viewer/dashboard should return viewer message', async () => {
    const res = await request(app).get('/viewer/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Welcome to the Viewer Dashboard' });
  });

  it('GET /moderator/dashboard should return moderator message', async () => {
    const res = await request(app).get('/moderator/dashboard');
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: 'Welcome to the Moderator Dashboard' });
  });

  it('GET /admin/unknown should return 404', async () => {
    const res = await request(app).get('/admin/unknown');
    expect(res.statusCode).toBe(404);
  });

  it('GET /viewer/unknown should return 404', async () => {
    const res = await request(app).get('/viewer/unknown');
    expect(res.statusCode).toBe(404);
  });

  it('GET /moderator/unknown should return 404', async () => {
    const res = await request(app).get('/moderator/unknown');
    expect(res.statusCode).toBe(404);
  });

  it('GET /nonexistent/route should return 404', async () => {
    const res = await request(app).get('/nonexistent/route');
    expect(res.statusCode).toBe(404);
  });

  it('GET root route should return 404', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toBe(404);
  });
});

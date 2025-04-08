import request from 'supertest';
import express from 'express';
import { getAllUsers, createUser, updateUser, deleteUser } from '../src/api/v1/controllers/UserController'; // Adjust the import based on your file structure

const app = express();
app.use(express.json()); // To parse JSON bodies

// Use the controller functions
app.get('/users', getAllUsers);
app.post('/users', createUser);
app.put('/users/:id', updateUser);
app.delete('/users/:id', deleteUser);

describe('User Controller Tests', () => {

  it('should get all users', async () => {
    const response = await request(app).get('/users');
    expect(response.status).toBe(200);
    expect(response.body.users).toBeDefined();
  });

  it('should create a user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        name: 'John Doe',
        email: 'john.doe@example.com',
        age: 30
      });
    
    expect(response.status).toBe(201);
    expect(response.body.message).toBe('User created successfully');
  });

  it('should update a user', async () => {
    // Assuming a user exists with id 1 for testing
    const response = await request(app)
      .put('/users/1')
      .send({
        name: 'John Smith',
        email: 'john.smith@example.com',
        age: 31
      });

    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User updated successfully');
  });

  it('should delete a user', async () => {
    // Assuming a user exists with id 1 for testing
    const response = await request(app).delete('/users/1');
    expect(response.status).toBe(200);
    expect(response.body.message).toBe('User deleted successfully');
  });
});

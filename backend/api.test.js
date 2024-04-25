// api.test.js
const request = require('supertest');
const express = require('express');
const apiRouter = require('./routes/api');

const app = express();
app.use('/api', apiRouter);

describe('API Endpoints', () => {
  test('GET /api/search returns search results', async () => {
    const response = await request(app).get('/api/search?term=Batman&mediaType=all');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('results');
    expect(response.body.results).toHaveLength(30);
  });

  test('GET /api/searchTest returns hardcoded search results', async () => {
    const response = await request(app).get('/api/searchTest');
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('results');
    expect(response.body.results).toHaveLength(30); 
  });
});

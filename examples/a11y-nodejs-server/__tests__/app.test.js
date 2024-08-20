const request = require('supertest');

const { app, server } = require('../src/service');

describe('Koa App', () => {
  afterAll(() => {
    server.close();
  });

  it('should return 200 OK for the root route', async () => {
    const response = await request(app.callback()).get('/');
    expect(response.status).toBe(200);
  });

  it('should return 404 for non-existent routes', async () => {
    const response = await request(app.callback()).get('/non-existent');
    expect(response.status).toBe(404);
  });
});

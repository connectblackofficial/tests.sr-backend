import { Application } from 'express';
import request from 'supertest';
import { StatusCodes } from 'http-status-codes';
import init from '../../src/app';

const app: Application = init()
describe('Main Controller', () => {
  it('should return a welcome message', async () => {
    const response = await request(app)
      .get('/api/');

    expect(response.status).toBe(StatusCodes.OK);
    expect(response.body).toEqual({
      success: true,
      payload: {
        message: 'Welcome! API is running...',
      },
    });
  });
});
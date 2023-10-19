import request from 'supertest';
import { Application } from 'express';
import { StatusCodes } from 'http-status-codes';
import init from '../src/app';

describe('Wallet App', () => {
  let app: Application;

  beforeAll(() => {
    app = init();
  });

  it('should respond with 404 when accessing an unknown route', async () => {
    const response = await request(app).get('/nonexistent-route');

    expect(response.status).toBe(StatusCodes.NOT_FOUND);
    expect(response.body).toEqual({
      success: false,
      errors: [
        {
          code: 'Not Found',
          field: 'path',
          message: 'Path Not Found. Please go to /api',
        },
      ],
    });
  });
});


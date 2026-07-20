import { describe, expect, it } from 'vitest';
import request from 'supertest';
import { app } from '../app';

describe('API gateway app- testing', () => {
  it('404 on unknown route- test', async () => {
    const response = await request(app).get('/unknown');
    expect(response.status).toBe(404);
  });
});

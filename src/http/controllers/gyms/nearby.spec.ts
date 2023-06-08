import request from 'supertest';
import { app } from '@/app';
import { afterAll, beforeAll, describe, expect, it, test } from 'vitest';
import { createAndAuthenticateUser } from '@/utils/test/create-and-authenticate-user';

describe('Nearby Gym (e2e)', () => {
  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should be able to list neaby gym', async () => {
    const { token } = await createAndAuthenticateUser(app);

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Js Gym',
        description: 'some description',
        phone: '99999999',
        latitude: -5.506135,
        longitude: -45.2444861,
      });

    await request(app.server)
      .post('/gyms')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Ts Gym',
        description: 'some description',
        phone: '99999999',
        latitude: -7.5276538,
        longitude: -46.0526632,
      });

    const response = await request(app.server)
      .get('/gyms/nearby')
      .query({
        latitude: -5.506135,
        longitude: -45.2444861,
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title: 'Js Gym',
      }),
    ]);
  });
});

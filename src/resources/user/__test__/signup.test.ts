import request from 'supertest';
import { makeUser } from './helpers';
import { app } from '../../../app';

it('return a 201 on sucessful signup', async () => {
  const user = makeUser();
  const result = await request(app)
    .post('/api/users/signup')
    .send({ ...user })
    .expect(201);

  return result;
});

it('returns a 400 with a invalid email', async () => {
  const user = makeUser();
  const result = await request(app)
    .post('/api/users/signup')
    .send({
      ...user,
      email: 'test.com',
    })
    .expect(400);
  return result;
});

it('returns a 400 with a invalid password', async () => {
  const user = makeUser();
  return request(app)
    .post('/api/users/signup')
    .send({
      ...user,
      password: 'pas',
    })
    .expect(400);
});

it('returns a 400 with missing email or password', async () => {
  const user = makeUser();
  await request(app)
    .post('/api/users/signup')
    .send({ ...user, password: '' })
    .expect(400);
  return request(app)
    .post('/api/users/signup')
    .send({ ...user, email: '' })
    .expect(400);
});

it('disallows duplicate emails', async () => {
  const user = makeUser();
  await request(app)
    .post('/api/users/signup')
    .send({ ...user })
    .expect(201);
  await request(app)
    .post('/api/users/signup')
    .send({ ...user })
    .expect(400);
});

it('sets a cookie after a sucessful signup', async () => {
  const user = makeUser();
  const response = await request(app)
    .post('/api/users/signup')
    .send({ ...user })
    .expect(201);
  expect(response.get('Set-Cookie')).toBeDefined();
});

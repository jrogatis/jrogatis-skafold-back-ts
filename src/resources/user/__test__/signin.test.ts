import request from 'supertest';
import { app } from '../../../app';
import { makeUser } from './helpers';
it('fail when a email that does not exist is supplied', async () => {
  return request(app)
    .post('/api/users/signin')
    .send({
      email: 'fail@test.com',
      password: 'password',
    })
    .expect(400);
});

it('fail when a incorrect password is supplied', async () => {
  const user = makeUser();
  await request(app)
    .post('/api/users/signup')
    .send({
      ...user,
    })
    .expect(201);
  await request(app)
    .post('/api/users/signin')
    .send({
      email: 'testeFail@test.com',
      password: 'fail',
    })
    .expect(400);
});
it('response with a cookie when given a valid credentials', async () => {
  const user = makeUser();
  await request(app)
    .post('/api/users/signup')
    .send({
      ...user,
    })
    .expect(201);

  const response = await request(app)
    .post('/api/users/signin')
    .send({
      email: user.email,
      password: user.password,
    })
    .expect(200);
  expect(response.get('Set-Cookie')).toBeDefined();
});

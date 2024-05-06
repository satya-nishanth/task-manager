import app from "app";
import request from "supertest"

it('fails when a email that does not exist is supplied', async () => {
  await request(app)
    .post('/user/login')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(500);
});

it('fails when an incorrect password is supplied', async () => {
  await request(app)
    .post('/user/register')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  await request(app)
    .post('/user/login')
    .send({
      email: 'test@test.com',
      password: 'aslkdfjalskdfj',
    })
    .expect(500);
});

it('sets a cookie after successful signup', async () => {
  const response = await request(app)
    .post('/user/register')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('responds with a cookie when given valid credentials', async () => {
  await request(app)
    .post('/user/register')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .post('/user/login')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(200);

  expect(response.get('Set-Cookie')).toBeDefined();
});

it('clears the cookie after signing out', async () => {
  await request(app)
    .post('/user/register')
    .send({
      email: 'test@test.com',
      password: 'password',
    })
    .expect(201);

  const response = await request(app)
    .get('/user/logout')
    .send({})
    .expect(200);

  expect(response.get('Set-Cookie')?.[0]).toEqual(
    'session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly'
  );
});

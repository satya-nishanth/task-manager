import app from 'app';
import request from 'supertest';

it('Create a task', async () => {
  const cookie = await global.signUp('test@test.com');
  const title = 'test task';
  const description = 'test';
  const response = await request(app)
    .post('/task/create')
    .set('Cookie', cookie)
    .send({ title, description })
    .expect(201);

  expect(response.body.title).toBe(title);
});

it('Fetch tasks', async () => {
  const cookie = await global.signUp('test@test.com');
  const title = 'test task';
  const description = 'test';

  await request(app)
    .post('/task/create')
    .set('Cookie', cookie)
    .send({ title, description })
    .expect(201);

  const response = await request(app)
    .get('/task')
    .set('Cookie', cookie)
    .expect(200);

  expect(response.body.tasks.length).toBeGreaterThan(0);
  expect(response.body.total).toBeGreaterThan(0);
  expect(response.body.currentPage).toBe(1);
});

it('Update task', async () => {
  const cookie = await global.signUp('user@example.com');
  const title = 'Original Title';
  const description = 'Original Description';
  const responseCreate = await request(app)
    .post('/task/create')
    .set('Cookie', cookie)
    .send({ title, description, status: 'to_do' })
    .expect(201);

  const updatedTitle = 'Updated Title';
  const responseUpdate = await request(app)
    .put(`/task/update`)
    .set('Cookie', cookie)
    .send({ id: responseCreate.body._id, title: updatedTitle })
    .expect(200);

  expect(responseUpdate.body.title).toBe(updatedTitle);
});

it('Delete task', async () => {
  const cookie = await global.signUp('user@domain.com');
  const title = 'Task to Delete';
  const description = 'Will be deleted';
  const responseCreate = await request(app)
    .post('/task/create')
    .set('Cookie', cookie)
    .send({ title, description })
    .expect(201);

  const responseDelete = await request(app)
    .delete(`/task/${responseCreate.body._id}`)
    .set('Cookie', cookie)
    .expect(200);

  expect(responseDelete.body.message).toBe('delete successful');
});

it("Task created by one user shouldn't be deleted by other", async () => {
  const cookie1 = await global.signUp('1@2.com');
  const title = 'test task';
  const description = 'test';
  const response = await request(app)
    .post('/task/create')
    .set('Cookie', cookie1)
    .send({ title, description })
    .expect(201);
  const cookie2 = await global.signUp('2@3.com');
  await request(app)
    .delete(`/task/${response.body._id}`)
    .set('Cookie', cookie2)
    .expect(500);
});

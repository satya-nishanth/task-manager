import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import request from 'supertest';
import app from 'app';

declare global {
  var signUp: (email?: string) => Promise<string[]>;
}

let mongo: MongoMemoryServer;

beforeAll(async () => {
  mongo = await MongoMemoryServer.create();
  const uri = mongo.getUri();
  await mongoose.connect(uri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();
  let promises: Promise<mongoose.mongo.DeleteResult>[] = [];
  for (let collection of collections) {
    promises.push(collection.deleteMany({}));
  }
  await Promise.all(promises);
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signUp = async (email: string = 'test@test.com') => {
  const password = '1234';
  const response = await request(app)
    .post('/user/register')
    .send({ email, password })
    .expect(201);

  const cookie = response.get('Set-Cookie');
  return cookie!;
};

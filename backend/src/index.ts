import dotenv from 'dotenv';
dotenv.config();
import app from 'app';
import mongoose from 'mongoose';

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

(async () => {
  if (!MONGO_URI) {
    throw new Error('mongo url is empty');
  }
  try {
    await mongoose.connect(MONGO_URI, { dbName: process.env.DB_NAME });
    app.listen(PORT, () => {
      console.log('running at ' + PORT);
    });
  } catch (err: any) {
    throw new Error(err?.message);
  }
})();

import mongoose from 'mongoose';
import 'dotenv/config';

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {
    if (1 === 1) {
      mongoose.set('debug', true);
      mongoose.set('debug', { color: true });
    }

    mongoose
      .connect(process.env.MONGODB_URI, clientOptions)
      .then(() => console.log('MongoDB Connected!'))
      .catch((err) => console.log(`MongoDB Connection Error: ${err.message}`));
  }
  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

export const DBConnect = Database.getInstance();

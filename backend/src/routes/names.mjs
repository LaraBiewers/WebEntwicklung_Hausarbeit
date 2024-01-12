import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config.js';

const router = express.Router();

let db;

MongoClient.connect(process.env.DATABASE_URL)
  .then((client) => {
    db = client.db();
  })
  .catch((err) => console.error(err));

// Getting all
router.get('/', async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const namesData = await db.collection('names').find().skip(skip).limit(limit).toArray();
    res.json(namesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

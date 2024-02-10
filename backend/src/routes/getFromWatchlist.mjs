import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config.js';

const router = express.Router();
let db;

// Verbinde zur richtigen Datenbank
MongoClient.connect(process.env.DATABASE_URL).then((client) => {
  db = client.db();
}).catch((err) => console.error(err));

// Drag requested items from watchlist collection
router.get('/', async (req, res) => {
  try {
    const skip = parseInt(req.query.skip) || 0;
    const limit = parseInt(req.query.limit) || 10;
    const sex = req.query.sex;
    const prio = req.query.prio;

    const query = {};
    if (sex) query.geschlecht = sex;
    if (prio) query.prio = prio;

    const watchlistCollection = db.collection('watchlist');
    const watchlistData = await watchlistCollection.find(query).skip(skip).limit(limit).toArray();
    const count = await watchlistCollection.countDocuments(query);
    res.json({ watchlistData, count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

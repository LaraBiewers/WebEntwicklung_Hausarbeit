import express from 'express';
import { MongoClient } from 'mongodb';
import 'dotenv/config.js';

const router = express.Router();

let db;

MongoClient.connect(process.env.DATABASE_URL).then((client) => {
  db = client.db();
}).catch((err) => console.error(err));

router.post('/addToWatchlist', async (req, res) => {
  try {
    const ObjectId = require('mongodb').ObjectId;
    const collection = db.collection('names');
    const item = await collection.findOne({ _id: new ObjectId(req.body.id) });
    const watchlistCollection = db.collection('watchlist');

    // Überprüfen, ob das Element bereits in der Watchlist vorhanden ist
    const existingItem = await watchlistCollection.findOne({ _id: new ObjectId(req.body.id) });

    if (!existingItem) {
      // Das Element ist noch nicht in der Watchlist, also füge es hinzu
      await watchlistCollection.insertOne(item);
      res.status(200).send('Item added to Watchlist');
    } else {
      // Das Element ist bereits in der Watchlist
      res.status(409).send('Item already in Watchlist');
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;

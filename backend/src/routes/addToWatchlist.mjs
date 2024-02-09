import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

import 'dotenv/config.js';

const router = express.Router();

let db;

// Verbinde zur richtigen Datenbank
MongoClient.connect(process.env.DATABASE_URL).then((client) => {
  db = client.db();
}).catch((err) => console.error(err));

router.post('/', async (req, res) => {
  // watchlist-Collection erstellen, falls noch nicht vorhanden
  const collections = await db.listCollections().toArray();
  const watchlistCollectionExists = collections.some(col => col.name === 'watchlist');
  try {
    if (!watchlistCollectionExists) {
      db.createCollection('watchlist');
    }
  } catch (error) {
    console.log(error);
  }

  // Element von names-Collection in watchlist-Collection kopieren
  try {
    // Extrahiere ID aus den Query-Parametern
    const idString = req.body.id;

    const namesCollection = db.collection('names');
    const watchlistCollection = db.collection('watchlist');

    // Verwenden ID, um entsprechendes Element in names-Collection zu finden
    const item = await namesCollection.findOne({ _id: new ObjectId(idString) });
    console.log(item);

    // Überprüfen, ob Element bereits in der watchlist-Collection vorhanden ist
    const existingItem = await watchlistCollection.findOne({ _id: new ObjectId(idString) });

    // Sende Antwort zurück an Frontend
    if (!existingItem) {
      // Element noch nicht in der watchlist, also füge hinzu
      await watchlistCollection.insertOne(item);
      res.status(200).json({ message: 'Item added to Watchlist' });
    } else {
      // Element ist in der watchlist
      res.status(409).json({ message: 'Item already in Watchlist' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

// router.post('/', async (req, res) => {
//   try {
//     const ObjectId = require('mongodb').ObjectId;
//     const namesCollection = db.collection('names');
//     const watchlistCollection = db.collection('watchlist');
//     const item = await namesCollection.findOne({ _id: new ObjectId(req.body.id) });

//     // Überprüfen, ob das Element bereits in der Watchlist vorhanden ist
//     const existingItem = await watchlistCollection.findOne({ _id: new ObjectId(req.body.id) });

//     if (!existingItem) {
//       // Das Element ist noch nicht in der Watchlist, also füge es hinzu
//       await watchlistCollection.insertOne(item);
//       res.status(200).send('Item added to Watchlist');
//     } else {
//       // Das Element ist bereits in der Watchlist
//       res.status(409).send('Item already in Watchlist');
//     }
//   } catch (error) {
//     res.status(500).send(error);
//   }
// });

export default router;

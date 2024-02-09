import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';

import 'dotenv/config.js';

const router = express.Router();

let db;

// Verbinde zur richtigen Datenbank
MongoClient.connect(process.env.DATABASE_URL).then((client) => {
  db = client.db();
}).catch((err) => console.error(err));

router.get('/', async (req, res) => {
  try {
    // Extrahiere ID aus den Query-Parametern
    const idString = req.query.id;

    // Verwenden ID, um entsprechendes Element in Datenbank zu finden
    const namesCollection = db.collection('names');
    const item = await namesCollection.findOne({ _id: new ObjectId(idString) });

    // Sende Antwort zurück an Frontend
    res.json({ item });
  } catch (error) {
    res.status(500).json({ message: error.message });
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

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config.js';

const router = express.Router();
let db;

// Verbinde zur richtigen Datenbank
MongoClient.connect(process.env.DATABASE_URL).then((client) => {
  db = client.db();
}).catch((err) => console.error(err));

router.patch('/', async (req, res) => {
  try {
    // Extrahiere ID aus den URL-Parametern
    const idString = req.body.id;

    // Referenzieren Sie die watchlist-Collection
    const watchlistCollection = db.collection('watchlist');

    // Finde das Element mit der angegebenen _ID aus der watchlist-Collection
    const item = await watchlistCollection.findOne({ _id: new ObjectId(idString) });

    // Überprüfe, ob das Element existiert
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // toggle value von prio des gefundenen Elements
    const updateResult = await watchlistCollection.updateOne(
      { _id: new ObjectId(idString) },
      { $set: { prio: item.prio === 'true' ? 'false' : 'true' } }
    );

    // Überprüfe, ob das Element erfolgreich aktualisiert wurde
    if (updateResult.matchedCount === 1 && updateResult.modifiedCount === 1) {
      res.status(200).json({ message: 'Item Updated' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;

import express from 'express';
import { MongoClient, ObjectId } from 'mongodb';
import 'dotenv/config.js';

const router = express.Router();
let db;

// Verbinde zur richtigen Datenbank
MongoClient.connect(process.env.DATABASE_URL).then((client) => {
  db = client.db();
}).catch((err) => console.error(err));

router.delete('/', async (req, res) => {
  try {
    // Extrahiere ID aus den URL-Parametern
    const idString = req.body.id;

    const watchlistCollection = db.collection('watchlist');
    const namesCollection = db.collection('names');

    // Lösche das Element mit der angegebenen ID aus der watchlist-Collection
    const item = await watchlistCollection.deleteOne({ _id: new ObjectId(idString) });
    await namesCollection.updateOne({ _id: new ObjectId(idString) }, { $set: { addedToWatchlist: false } });

    // Überprüfe, ob das Element erfolgreich gelöscht wurde
    if (item.deletedCount > 0) {
      res.status(200).json({ message: 'Item removed from Watchlist' });
    }
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;

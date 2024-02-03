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
    const sex = req.query.sex;
    const prefix = req.query.prefix;
    const notPrefix = req.query.notPrefix;
    const suffix = req.query.suffix;
    const notSuffix = req.query.notSuffix;
    const syllables = parseInt(req.query.syllables);

    const query = {};
    if (sex) query.geschlecht = sex;
    if (prefix) query.$and = query.$and || [];
    if (prefix) query.$and.push({ name: { $regex: `^${prefix}` } });
    if (notPrefix) query.$and = query.$and || [];
    if (notPrefix) query.$and.push({ name: { $not: { $regex: `^${notPrefix}` } } });
    if (suffix) query.$and = query.$and || [];
    if (suffix) query.$and.push({ name: { $regex: `${suffix}$` } });
    if (notSuffix) query.$and = query.$and || [];
    if (notSuffix) query.$and.push({ name: { $not: { $regex: `${notSuffix}$` } } });
    if (syllables) query.silben = { $eq: syllables };

    const namesData = await db.collection('names').find(query).skip(skip).limit(limit).toArray();
    res.json(namesData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

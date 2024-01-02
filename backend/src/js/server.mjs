import express from 'express';
import { MongoClient } from 'mongodb';
import "dotenv/config.js";

const app = express();
const port = process.argv[2] || 8080;

app.use(express.static('build'));

let db;

MongoClient.connect(process.env.DATABASE_URL)
   .then((client) => {
       console.log('Connected to Database');
       db = client.db(); 
   })
   .catch((err) => console.error(err));
console.log(db);

app.get('/api/names', async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const namesData = await db.collection('names').find().skip(skip).limit(10).toArray();
  res.json(namesData);
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

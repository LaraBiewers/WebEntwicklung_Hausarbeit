import express from 'express';
import namesRouter from '../routes/names.mjs';

const app = express();
const port = process.argv[2] || 8080;

app.use(express.static('build'));

app.use('/names', namesRouter);
/*
app.get('/api/names', async (req, res) => {
  const skip = parseInt(req.query.skip) || 0;
  const namesData = await db.collection('names').find().skip(skip).limit(10).toArray();
  res.json(namesData);
});
*/

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

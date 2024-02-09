import express from 'express';
import namesRouter from '../routes/names.mjs';
import watchlistRouter from '../routes/addToWatchlist.mjs';

const app = express();
const port = process.argv[2] || 8080;

app.use(express.static('build'));
app.use(express.json());

app.use('/names', namesRouter);
app.use('/addToWatchlist', watchlistRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

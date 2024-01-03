import express from 'express';
import namesRouter from '../routes/names.mjs';

const app = express();
const port = process.argv[2] || 8080;

app.use(express.static('build'));

app.use('/names', namesRouter);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

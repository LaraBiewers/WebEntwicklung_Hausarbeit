import express from 'express';

const app = express();
const port = process.argv[2] || 8080;

app.use(express.static('build'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

import express from 'express';

const app = express();
const port = process.env.PORT || 8080;

app.use(express.static('frontend/build'));

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

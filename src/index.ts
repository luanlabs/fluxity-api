import express from 'express';
import db from './database/db';

const app = express();
const port = 3000;
db();

app.get('/', (req, res) => {
  res.send('ggg');
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

console.log('a');

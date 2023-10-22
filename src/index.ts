import express from 'express';
import db from './db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import indexHandler from './routes/token/indexHandler';

//env file
dotenv.config();

const app = express();
const port = process.env.PORT;

//connect database
const uriDb = process.env.DB_URI;
const nameDb = process.env.DB_NAME;

if (typeof uriDb !== 'string' || typeof nameDb !== 'string') {
  console.log('database URI or Name is invalid');
  process.exit(1);
}

db(uriDb, nameDb);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', indexHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

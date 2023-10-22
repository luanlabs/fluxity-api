import express from 'express';
import db from './database/db';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';

import indexHandler from './routes/token/indexHandler';

const app = express();
const port = 3000;

//connect database
db();

//env file
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', indexHandler);

// app.get('/', bodyParser.urlencoded(), index); If there is a body request

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

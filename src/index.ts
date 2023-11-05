import express from 'express';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import compression from 'compression';
import helmet from 'helmet';

import router from './routes';
import db from './db';
import jsonResponse from './middleware/jsonResponse';

dotenv.config();

const app = express();

const { PORT: port, DB_URI: uriDB, DB_NAME: nameDB } = process.env;

if (typeof uriDB !== 'string' || typeof nameDB !== 'string') {
  console.log('database URI or name is invalid');
  process.exit(1);
}

db(uriDB, nameDB);

app.use(compression());
app.use(helmet());
app.disable('x-powered-by');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jsonResponse);
app.use(router);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

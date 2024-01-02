import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import db from './db';
import router from './routes';
import jsonResponse from './middleware/jsonResponse';
import listenToTestNetContractEvents from './event/listenToTestNetContractEvents';
import { log } from './logger';

dotenv.config();

const app = express();

const { PORT: port, DB_URI: uriDB, DB_NAME: nameDB } = process.env;

if (typeof uriDB !== 'string' || typeof nameDB !== 'string') {
  log.fatal({ message: 'database URI or name is invalid' });
  process.exit(1);
}

db(uriDB, nameDB);

app.use(compression());
app.use(helmet());
app.disable('x-powered-by');

listenToTestNetContractEvents();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jsonResponse);
app.use(router);

app.listen(port, () => {
  log.info({ message: 'App started' });
});

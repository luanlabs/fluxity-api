import cors from 'cors';
import helmet from 'helmet';
import express from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';

import db from './db';
import envs from './env';
import router from './routes';
import { log } from './logger';
import jsonResponse from './middleware/jsonResponse';
import listenToTestNetContractEvents from './event/listenToTestNetContractEvents';
// import listenToMainNetContractEvents from './event/listenToMainNetContractEvents';

const app = express();

const { PORT: port, DB_URI: uriDB, DB_NAME: nameDB } = envs();

if (typeof uriDB !== 'string' || typeof nameDB !== 'string') {
  log.fatal('database URI or name is invalid');
  process.exit(1);
}

db(uriDB, nameDB);

app.use(compression());
app.use(helmet());
app.disable('x-powered-by');

// listenToMainNetContractEvents();
listenToTestNetContractEvents();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(jsonResponse);
app.use(router);

app.listen(port, () => {
  log.info('App started');
});

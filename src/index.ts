import cors, { type CorsOptions } from 'cors';
import helmet from 'helmet';
import express from 'express';
import mongoose from 'mongoose';
import compression from 'compression';

import db from './db';
import envs from './env';
import router from './routes';
import log from './logger';
import { Networks } from './constant/network';
import jsonResponse from './middleware/jsonResponse';
import listenToContractEvents from './event/listenToContractEvents';
import getErrorMessage from './utils/getErrorMessage';

const { PORT, DB_URI, DB_NAME, CORS_ORIGIN } = envs();

const app = express();

// Restrict CORS to the configured origins, or allow any when set to "*".
const corsOptions: CorsOptions =
  CORS_ORIGIN === '*' ? {} : { origin: CORS_ORIGIN.split(',').map((origin) => origin.trim()) };

app.disable('x-powered-by');
app.use(helmet());
app.use(compression());
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(jsonResponse);

// Lightweight liveness/readiness probe (used by Docker/compose healthchecks).
app.get('/health', (_req, res) => {
  const connected = mongoose.connection.readyState === 1;
  res.status(connected ? 200 : 503).json({
    status: connected ? 'success' : 'error',
    message: connected ? 'OK' : 'Database not connected',
    result: {
      uptime: process.uptime(),
      db: connected ? 'connected' : 'disconnected',
    },
  });
});

app.use(router);

async function bootstrap() {
  await db(DB_URI, DB_NAME);

  // Start syncing on-chain lockup events. Mainnet is intentionally disabled for now.
  void listenToContractEvents(Networks.Testnet);
  // void listenToContractEvents(Networks.Mainnet);

  const server = app.listen(PORT, () => {
    log.info(`Fluxity API listening on port ${PORT}`);
  });

  server.on('error', (error) => {
    log.fatal(`HTTP server error: ${getErrorMessage(error)}`);
    process.exit(1);
  });

  const shutdown = (signal: string) => {
    log.info(`Received ${signal}, shutting down gracefully`);
    server.close(() => {
      mongoose.connection.close().finally(() => process.exit(0));
    });
    // Force-exit if connections do not drain in time.
    setTimeout(() => process.exit(1), 10_000).unref();
  };

  process.on('SIGTERM', () => shutdown('SIGTERM'));
  process.on('SIGINT', () => shutdown('SIGINT'));
}

bootstrap().catch((error) => {
  log.fatal(`Failed to start Fluxity API: ${getErrorMessage(error)}`);
  process.exit(1);
});

import pino, { type LoggerOptions } from 'pino';

import envs from './env';

const { LOG_LEVEL, NODE_ENV, LOG_FILE_PATH } = envs();

const options: LoggerOptions = {
  level: LOG_LEVEL,
  // Drop pino's default `pid`/`hostname` fields; keep a single service name.
  base: { name: 'FLUXITY_API' },
};

function createLogger() {
  if (NODE_ENV === 'production') {
    // Structured JSON to a file (when configured) or stdout, collected by the platform.
    return LOG_FILE_PATH
      ? pino(options, pino.destination({ dest: LOG_FILE_PATH, mkdir: true, sync: false }))
      : pino(options);
  }

  // Human-friendly, colorized output for local development/tests.
  return pino({
    ...options,
    transport: {
      target: 'pino-pretty',
      options: { colorize: true, translateTime: 'SYS:standard', ignore: 'pid,hostname' },
    },
  });
}

export const log = createLogger();

export default log;

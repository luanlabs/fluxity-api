import bunyan from 'bunyan';
import dotenv from 'dotenv';

dotenv.config();

export const log = bunyan.createLogger({
  name: 'fluxity-app',
  level: bunyan.TRACE,
  src: true,
  streams: [
    {
      level: bunyan.TRACE,
      stream: process.stdout,
    },
    {
      level: bunyan.WARN,
      path: process.env.LOG_FILE_PATH,
    },
  ],
});

export default log;

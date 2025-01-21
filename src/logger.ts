import bunyan from 'bunyan';

import envs from './env';

const { LOG_FILE_PATH, NODE_ENV } = envs();

const streams: bunyan.Stream[] = [
  {
    level: bunyan.TRACE,
    stream: process.stdout,
  },
];

if (NODE_ENV == 'production') {
  streams[0] = {
    level: bunyan.TRACE,
    path: LOG_FILE_PATH,
  };
}

export const log = bunyan.createLogger({
  name: 'FLUXITY_API',
  level: bunyan.TRACE,
  src: true,
  streams,
});

delete log.fields.hostname;
delete log.fields.pid;
delete log.fields.v;
delete log.fields.level;

export default log;

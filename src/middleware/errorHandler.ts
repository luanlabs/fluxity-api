import { ErrorRequestHandler } from 'express';

import log from '../logger';
import getErrorMessage from '../utils/getErrorMessage';

/**
 * Final error handler. Logs the real error server-side but never leaks error
 * internals (stack traces, messages) to the client.
 */
const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  log.error(`Unhandled request error: ${getErrorMessage(err)}`);

  return res.status(500).json({
    status: 'error',
    message: 'Something went wrong',
    result: {},
  });
};

export default errorHandler;

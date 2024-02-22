/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from 'express';

const errorHandler: ErrorRequestHandler = (err, req, res, _) => {
  return res.status(500).j({
    status: 'error',
    message: 'Something went wrong',
    result: { error: err },
  });
};

export default errorHandler;

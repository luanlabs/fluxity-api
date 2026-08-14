import { RequestHandler } from 'express';

const notFound: RequestHandler = (_req, res) => {
  res.status(404).j({
    status: 'error',
    message: '404 Not Found',
    result: {},
  });
};

export default notFound;

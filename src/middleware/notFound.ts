import { RequestHandler } from 'express';

const notFound: RequestHandler = (req, res, _) => {
  res.status(404).j({
    status: 'error',
    message: '404 Not Found',
    result: {},
  });
};

export default notFound;

import { RequestHandler } from 'express';

const indexHandler: RequestHandler = (req, res) => {
  res.send('Hello');
};

export default indexHandler;

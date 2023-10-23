import { RequestHandler } from 'express';

const addTokenRoute: RequestHandler = async (req, res) => {
  res.json({ ok: 'ok' });
};

export default addTokenRoute;

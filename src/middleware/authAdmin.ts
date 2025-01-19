import { RequestHandler } from 'express';
import envs from '../env';

const authAdmin: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers;

  const { ADMIN_PASSWORD } = envs();

  if (!authorization) {
    return res.status(403).json({
      status: 'error',
      message: 'Authorization failed',
      result: {},
    });
  } else if (authorization === ADMIN_PASSWORD) {
    next();
  } else {
    return res.status(403).json({
      status: 'error',
      message: 'Authorization failed',
      result: {},
    });
  }
};

export default authAdmin;

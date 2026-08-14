import { RequestHandler } from 'express';

/**
 * Attaches `res.j(...)`, a helper that sends the standardized
 * `{ status, message, result }` JSON envelope used across the API.
 * The method signature is declared in `src/types/express.d.ts`.
 */
const jsonResponse: RequestHandler = (_req, res, next) => {
  res.j = (body) => {
    res.json(body);
    return res;
  };

  next();
};

export default jsonResponse;

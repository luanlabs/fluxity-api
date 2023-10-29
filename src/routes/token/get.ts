import { RequestHandler } from 'express';
import Token from '../../models/Token';

const getToken: RequestHandler = async (req, res) => {
  const tokens = await Token.find({});
  return res.status(200).json(tokens);
};
export default getToken;

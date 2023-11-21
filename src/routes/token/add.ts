import { RequestHandler } from 'express';

import Token from '../../models/Token';
import saveToken from '../../utils/token/saveToken';

const addTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token, logo } = req.body;

    const existingToken = await Token.findOne({ address: token });
    if (existingToken) {
      return res.status(400).j({
        status: 'error',
        message: 'Token already exists',
        result: {},
      });
    }

    const newToken = await saveToken(token, logo);

    return res.status(201).j({
      status: 'success',
      message: 'Token has been saved successfully',
      result: newToken,
    });
  } catch (e) {
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default addTokenRoute;

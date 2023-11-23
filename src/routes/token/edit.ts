import { RequestHandler } from 'express';

import Token from '../../models/Token';

const editTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { token, logo } = req.body;

    const existingToken = await Token.findOne({ address: token });
    if (!existingToken) {
      return res.status(404).j({
        status: 'error',
        message: 'Token dose not exist',
        result: {},
      });
    }

    if (!logo) {
      return res.status(412).j({
        status: 'error',
        message: 'Logo is invalid',
        result: {},
      });
    }

    const tokenEdited = await Token.findOneAndUpdate({ address: token }, { logo });

    return res.status(200).j({
      status: 'success',
      message: 'Token changed logo successfully',
      result: tokenEdited,
    });
  } catch (e) {
    return res.status(500).j({
      status: 'error',
      message: e.message,
      result: {},
    });
  }
};

export default editTokenRoute;

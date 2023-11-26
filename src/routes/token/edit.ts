import { RequestHandler } from 'express';

import Token from '../../models/Token';

const editTokenRoute: RequestHandler = async (req, res) => {
  try {
    const { logo } = req.body;
    const { token } = req.params;

    const existingToken = await Token.findOne({ address: token });
    if (!existingToken) {
      return res.status(404).j({
        status: 'error',
        message: 'Token dose not exist',
        result: {},
      });
    }

    if (!logo) {
      return res.status(400).j({
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

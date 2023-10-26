import express from 'express';

import addTokenRoute from './addToken';
import mintTokenRoute from './mintToken';
import isAuthorization from '../../utils/authAdmin';

const router = express.Router();

router.post('/', isAuthorization, addTokenRoute);
router.post('/mint', isAuthorization, mintTokenRoute);

export default router;

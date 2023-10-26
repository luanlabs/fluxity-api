import express from 'express';

import addTokenRoute from './addToken';
import mintTokenRoute from './mintToken';
import authAdmin from '../../utils/authAdmin';

const router = express.Router();

router.post('/', authAdmin, addTokenRoute);
router.post('/mint', mintTokenRoute);

export default router;

import express from 'express';

import addTokenRoute from './addToken';
import mintTokenRoute from './mintToken';
import authAdmin from '../../utils/authAdmin';
import deleteToken from './deleteToken';

const router = express.Router();

router.post('/', authAdmin, addTokenRoute);
router.delete('/', authAdmin, deleteToken);
router.post('/mint', mintTokenRoute);

export default router;

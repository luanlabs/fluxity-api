import express from 'express';

import addTokenRoute from './add';
import mintTokenRoute from './mint';
import authAdmin from '../../middleware/authAdmin';
import deleteToken from './delete';
import getToken from './get';

const router = express.Router();

router.post('/', authAdmin, addTokenRoute);
router.delete('/', authAdmin, deleteToken);
router.get('/', getToken);
router.post('/mint', mintTokenRoute);

export default router;

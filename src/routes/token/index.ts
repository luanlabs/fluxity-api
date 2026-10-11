import express from 'express';

import addTokenRoute from './add';
import authAdmin from '../../middleware/authAdmin';
import deleteTokenRoute from './delete';
import getTokensRoute from './get';
import editTokenRoute from './edit';

const router = express.Router();

router.post('/', authAdmin, addTokenRoute);
router.delete('/', authAdmin, deleteTokenRoute);
router.put('/:token', authAdmin, editTokenRoute);
router.get('/', getTokensRoute);

export default router;

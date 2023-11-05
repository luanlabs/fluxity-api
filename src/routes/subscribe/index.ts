import express from 'express';

import addSubscriber from './add';
import getSubscribers from './get';
import authAdmin from '../../middleware/authAdmin';

const router = express.Router();

router.post('/', addSubscriber);
router.get('/', authAdmin, getSubscribers);

export default router;

import express from 'express';

import addSubscriber from './add';
import getSubscribers from './get';

const router = express.Router();

router.post('/', addSubscriber);
router.get('/', getSubscribers);

export default router;

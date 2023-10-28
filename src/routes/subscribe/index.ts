import express from 'express';

import addSubscriber from './addSubscriber';
import getSubscribers from './getSubscribers';

const router = express.Router();

router.post('/add-subscriber', addSubscriber);
router.get('/get-subscribers', getSubscribers);

export default router;

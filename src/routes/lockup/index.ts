import express from 'express';

import getLockupByIdRoute from './getLockupById';
import getLockupsRoute from './getLockups';
import addLockupRoute from './add';
import cancelLockupRoute from './cancel';
import withdrawLockupRoute from './withdraw';

const router = express.Router();

router.get('/', getLockupsRoute);
router.get('/:id', getLockupByIdRoute);

router.post('/', addLockupRoute);
router.delete('/', cancelLockupRoute);
router.put('/', withdrawLockupRoute);

export default router;

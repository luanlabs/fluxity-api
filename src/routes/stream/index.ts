import express from 'express';

import getStreamByIdRoute from './getStreamById';
import getStreamsRoute from './getStreams';
import addStreamRoute from './add';
import cancellStreamRoute from './cancell';
import withdrawnStreamRoute from './withdrawn';
import authAdmin from '../../middleware/authAdmin';

const router = express.Router();

router.get('/', getStreamsRoute);
router.get('/:id', getStreamByIdRoute);

router.post('/', authAdmin, addStreamRoute);
router.delete('/', authAdmin, cancellStreamRoute);
router.put('/', authAdmin, withdrawnStreamRoute);

export default router;

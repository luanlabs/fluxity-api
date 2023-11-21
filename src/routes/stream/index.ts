import express from 'express';

import getStreamByIdRoute from './getStreamById';
import getStreamsRoute from './getStreams';
import addStreamRoute from './add';
import cancelStreamRoute from './cancel';
import withdrawStreamRoute from './withdraw';

const router = express.Router();

router.get('/', getStreamsRoute);
router.get('/:id', getStreamByIdRoute);

router.post('/', addStreamRoute);
router.delete('/', cancelStreamRoute);
router.put('/', withdrawStreamRoute);

export default router;

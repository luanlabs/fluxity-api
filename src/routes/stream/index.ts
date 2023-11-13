import express from 'express';

import getStreamByIdRoute from './getStreamById';
import getStreamsRoute from './getStreams';

const router = express.Router();

router.use('/', getStreamsRoute);
router.use('/:id', getStreamByIdRoute);

export default router;

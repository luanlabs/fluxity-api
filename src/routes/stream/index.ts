import express from 'express';

import getStreamByIdRoute from './getStreamById';
import getStreamsRoute from './getStreams';

const router = express.Router();

router.get('/', getStreamsRoute);
router.get('/:id', getStreamByIdRoute);

export default router;

import express from 'express';

import getStreamFromId from './getStreamFromId';
import getStreams from './getStreams';

const router = express.Router();

router.use('/', getStreams);
router.use('/:id', getStreamFromId);

export default router;

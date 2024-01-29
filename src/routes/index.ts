import express from 'express';

import tokenRoutes from './token';
import streamRoutes from './stream';
import subscribeRoutes from './subscribe';
import swaggerRoutes from './swagger';
import notFound from '../middleware/notFound';
import errorHandler from '../middleware/errorHandler';
import networkHandler from '../middleware/networkHandler';

const router = express.Router();

router.use('/:network/token', networkHandler, tokenRoutes);
router.use('/:network/stream', networkHandler, streamRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/swagger', swaggerRoutes);

router.use(notFound);
router.use(errorHandler);

export default router;

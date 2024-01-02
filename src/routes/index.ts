import express from 'express';

import tokenRoutes from './token';
import streamRoutes from './stream';
import subscribeRoutes from './subscribe';
import swaggerRoutes from './swagger';
import notFound from '../middleware/notFound';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();

router.use(['/testnet/token', '/mainnet/token'], tokenRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/swagger', swaggerRoutes);
router.use(['/testnet/stream', '/mainnet/stream'], streamRoutes);

router.use(notFound);
router.use(errorHandler);

export default router;

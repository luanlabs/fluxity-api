import express from 'express';

import tokenRoutes from './token';
import subscribeRoutes from './subscribe';
import swaggerRoutes from './swagger';
import notFound from '../middleware/notFound';
import errorHandler from '../middleware/errorHandler';

const router = express.Router();

router.use('/testnet/token', tokenRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/swagger', swaggerRoutes);

router.use(notFound);
router.use(errorHandler);

export default router;

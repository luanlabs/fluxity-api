import express from 'express';

import tokenRoutes from './token';
import subscribeRoutes from './subscribe';
import swaggerRoutes from './swagger';

const router = express.Router();

router.use('/token', tokenRoutes);
router.use('/subscribe', subscribeRoutes);
router.use('/swagger', swaggerRoutes);

export default router;

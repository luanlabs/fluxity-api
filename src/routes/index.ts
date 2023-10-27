import express from 'express';

import tokenRoutes from './token';
import subscribeRoutes from './subscribe';

const router = express.Router();

router.use('/token', tokenRoutes);
router.use('/subscribe', subscribeRoutes);

export default router;

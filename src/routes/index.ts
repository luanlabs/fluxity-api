import express from 'express';

import tokenRoutes from './token';

const router = express.Router();

router.use('/token', tokenRoutes);

export default router;

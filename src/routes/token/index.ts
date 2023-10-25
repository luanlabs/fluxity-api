import express from 'express';

import addTokenRoute from './addToken';
import mintTokenRoute from './mintToken';

const router = express.Router();

router.post('/', addTokenRoute);
router.post('/mint', mintTokenRoute);

export default router;

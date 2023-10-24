import express from 'express';

import addTokenRoute from './addToken';
import mintToken from './mintToken';

const router = express.Router();

router.get('/add', addTokenRoute);
router.post('/mint', mintToken);

export default router;

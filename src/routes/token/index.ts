import express from 'express';

import addTokenRoute from './addToken';

const router = express.Router();

router.get('/add', addTokenRoute);

export default router;

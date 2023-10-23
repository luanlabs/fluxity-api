import express from 'express';

import indexHandler from '../controller/indexHandler';

const router = express.Router();

router.get('/', indexHandler);

export default router;

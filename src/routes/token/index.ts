import express from 'express';

import addTokenRoute from './add';
import mintTokenRoute from './mint';
import authAdmin from '../../middleware/authAdmin';
import deleteTokenRoute from './delete';
import getTokensRoute from './get';
import alreadyMintedRoute from './alreadyMinted';

const router = express.Router();

router.post('/', authAdmin, addTokenRoute);
router.delete('/', authAdmin, deleteTokenRoute);
router.get('/already-minted/:user', alreadyMintedRoute);
router.get('/', getTokensRoute);
router.post('/mint', mintTokenRoute);

export default router;

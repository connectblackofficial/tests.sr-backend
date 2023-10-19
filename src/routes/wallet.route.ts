import express, { Router } from 'express';
import asyncify from 'express-asyncify';
import WalletController from '../controllers/wallet.controller';
import { validateMiddleware } from '../middlewares/validate';
import { walletRequestSchema } from '../models/wallet';

const router: Router = asyncify(express.Router());

/**
 * @method POST
 * @access private
 * @endpoint /api
 */
router.post('/add', validateMiddleware(walletRequestSchema), WalletController.add);

/**
 * @method POST
 * @access private
 * @endpoint /api
 */
router.post('/subtract', validateMiddleware(walletRequestSchema), WalletController.subtract);

export default router;

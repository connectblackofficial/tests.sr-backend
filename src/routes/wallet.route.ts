import express, { Router } from 'express';
import WalletController from '../controllers/wallet.controller';

const router: Router = express.Router();

/**
 * @method POST
 * @access private
 * @endpoint /api
 */
router.post('/add', WalletController.add);

/**
 * @method POST
 * @access private
 * @endpoint /api
 */
router.post('/subtract', WalletController.subtract);

export default router;

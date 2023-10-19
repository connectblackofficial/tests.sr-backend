import express, { Router } from 'express';
import AuthController from '../controllers/auth.controller';

const router: Router = express.Router();

/**
 * @method POST
 * @access public
 * @endpoint /api/auth
 */
router.post('/', AuthController.login);

export default router;

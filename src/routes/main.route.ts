import express, { Router } from 'express';
import MainController from '../controllers/main.controller';

const router: Router = express.Router();

/**
 * @method GET
 * @access public
 * @endpoint /api
 */
router.get('/', MainController.index);

export default router;

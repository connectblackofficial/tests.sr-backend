import { Router, Request, Response } from 'express';
import Validations from '../middlewares/Validations';
import LoginController from '../controllers/LoginController';
import Authorized from '../middlewares/Authorized';

const loginRouter = Router();
const login = new LoginController();

loginRouter.get(
  '/login/authenticated',
  Authorized,
  (req : Request, res : Response) => login.loginRole(req, res),
);

loginRouter.post(
  '/login',
  Validations.validateLogin,
  (req: Request, res: Response) => login.login(req, res),
);
 
export default loginRouter;
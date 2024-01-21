import { Request, Response, Router, NextFunction } from "express";
import Authorized from "../middlewares/Authorized";
import UserController from '../controllers/UserController';
import Validations from "../middlewares/Validations";

const userRouter = Router();
const userController = new UserController();

userRouter.get(
  '/all',
  (req: Request, res: Response) => userController.getAllUsers(req, res),
);

userRouter.get(
  '/',
  Authorized,
  (req: Request, res: Response) => userController.getByUserId(req, res),
);

userRouter.post(
  '/',
  Validations.validateCreateUser,
  (req: Request, res: Response) => userController.createUser(req, res),
);

export default userRouter;
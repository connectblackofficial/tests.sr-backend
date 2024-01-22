import { Request, Response, Router } from "express";
import Validations from "../middlewares/Validations";
import WalletController from "../controllers/WalletController";
import Authorized from "../middlewares/Authorized";

const walletRouter = Router();
const walletController = new WalletController();

walletRouter.post(
  '/',
  Authorized,
  Validations.validateCreateWallet,
  (req: Request, res: Response) => walletController.createWallet(req, res),
);

walletRouter.get(
  '/all',
  (req: Request, res: Response) => walletController.getAllWallets(req, res),
);

walletRouter.get(
  '/:id',
  Authorized,
  (req: Request, res: Response) => walletController.getByWalletId(req, res),
);

walletRouter.post(
  '/add',
  Authorized,
  Validations.validateCreateWallet,
  (req: Request, res: Response) => walletController.addingBalance(req, res),
);

walletRouter.post(
  '/subtract',
  Authorized,
  Validations.validateCreateWallet,
  (req : Request, res: Response) => walletController.subtractBalance(req, res),
);

export default walletRouter;
import { Router } from "express";
import userRouter from "./user.routes";
import loginRouter from "./login.routes";
import walletRouter from "./wallet.routes";

const router = Router();

router.use('/user', userRouter);
router.use('/api/wallet', walletRouter);
router.use(loginRouter);

export default router;
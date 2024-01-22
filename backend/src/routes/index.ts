import { Router } from "express";
import userRouter from "./user.routes";
import loginRouter from "./login.routes";
import walletRouter from "./wallet.routes";
import cacheRoutes from "./cache.routes";

const router = Router();

router.use('/user', userRouter);
router.use('/api/wallet', walletRouter);
router.use('/cache', cacheRoutes)
router.use(loginRouter);

export default router;
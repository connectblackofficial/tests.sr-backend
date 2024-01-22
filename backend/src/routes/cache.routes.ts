import { Request, Response, Router } from "express";
import redis from "../lib/cache";

const cacheRoutes = Router();

cacheRoutes.get('/clear', async (req: Request, res: Response) => {
  await redis.del("wallet:all");

  res.json({
    ok: true
  })
});

export default cacheRoutes;
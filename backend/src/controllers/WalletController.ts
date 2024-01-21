import { Request, Response } from "express";
import mapStatusHTTP from "../utils/mapStatusHTTP";
import WalletService from "../services/WalletService";
import redis from "../lib/cache";

export default class WalletController {
  constructor(
    private walletService = new WalletService(),
  ) { };

  private async updateCache(id: number) {
    const cacheKey = `wallet:${id}`;
    const wallet = await this.walletService.getById(id);

    if (wallet && wallet.status === 'SUCCESSFUL') {
      // Update the cache with the latest wallet data
      await redis.set(cacheKey, JSON.stringify(wallet.data));
    }
  }

  public async getDataFromCache(id: number | string) {
    const cacheKey = `wallet:${id}`;
    
    const cachedData = await redis.get(cacheKey);

    if (cachedData) {
      const parsedData = JSON.parse(cachedData);
      return parsedData;
    } else {
      return null;
    }
  }
   
  public async getAllWallets(_req: Request, res: Response) {
    const cacheKey = "wallet:all";
    const cachedWallets = await redis.get(cacheKey);
    if (cachedWallets) return res.json(JSON.parse(cachedWallets));

    const wallets = await this.walletService.getAll();

    await redis.set(cacheKey, JSON.stringify(wallets.data));

    return res.status(200).json(wallets.data);
  }

  public async createWallet(req : Request, res : Response) {
    const userId = Number(req.body.userId);

    const create = await this.walletService.create(userId, req.body);
    
    if (create.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(create.status)).json(create.data);
    }

    await this.updateCache(create.data.id);

    return res.status(201).json(create.data);
  };

  public async getByWalletId(req : Request, res : Response) {
    const { id } = req.params;

    const checkingIdInCache = await this.getDataFromCache(id);

    if (checkingIdInCache !== null) {
      res.status(200).json(checkingIdInCache);
    }

    const walletId = await this.walletService.getById(Number(id));

    if (walletId.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(walletId.status)).json(walletId.data);
    }

    return res.status(200).json(walletId.data);
  }

  public async addingBalance(req: Request, res: Response) {
    const { balance, walletName, userId } = req.body;

    const adding = await this.walletService.walletAdd({ userId: Number(userId), balance, walletName });

    if (adding.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(adding.status)).json(adding.data);
    }

    await this.updateCache(adding.data.id);

    return res.status(200).json({
      message: 'Operation successful',
      updatedBalance: adding.data.balance
    });
  }

  public async subtractBalance(req: Request, res: Response) {
    const { balance, walletName, userId } = req.body;

    const subtract = await this.walletService.walletSubtract({ userId: Number(userId), balance, walletName });

    if (subtract.status !== 'SUCCESSFUL') {
      return res.status(mapStatusHTTP(subtract.status)).json(subtract.data);
    }

    await this.updateCache(subtract.data.id);

    return res.status(200).json({
      message: 'Operation successful',
      updatedBalance: subtract.data.balance
    });
  }
}
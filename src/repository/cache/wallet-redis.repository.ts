import { Injectable } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { RedisService } from 'src/config/redis';
import { WalletDTO } from 'src/wallet/dto/transact-wallet.dto';
import { WalletRepository } from 'src/repository/wallet.repository';
import { InjectQueue } from '@nestjs/bullmq';
import { queueNames } from 'src/utils';
import { Queue } from 'bullmq';
import { WalletCacheRepository } from '../wallet-cache.repository';

@Injectable()
export class WalletRedisRepository implements WalletCacheRepository {
  constructor(
    private readonly redis: RedisService,
    private readonly walletRepository: WalletRepository, // WE CAN CHANGE THE ORM ABSTRACT REPOSITORY IMPLEMENTATION
    @InjectQueue(queueNames.WALLET) private walletQueue: Queue,
  ) {}

  async findUnique(name: string, userId: string): Promise<Wallet> {
    // GET WALLET IN MEMORY
    const walletKey = `${name}_${userId}`;
    const cachedWallet = await this.redis.get(walletKey);

    // IF DOESN`T EXISTS, GET FROM DATABASE AND STORE IN MEMORY
    if (!cachedWallet) {
      const wallet = await this.walletRepository.findUnique(name, userId);
      this.redis.set(walletKey, JSON.stringify(wallet));

      return wallet;
    }

    // IF EXISTS, JUST RETURN IT
    return JSON.parse(cachedWallet);
  }

  async transact(
    walletDTO: WalletDTO,
    transactionValue: number,
  ): Promise<Wallet> {
    // GET WALLET IN MEMORY
    const walletKey = `${walletDTO.walletName}_${walletDTO.userId}`;
    const cachedWallet = await this.redis.get(walletKey);
    const cachedWalletJSON: Wallet = JSON.parse(cachedWallet);
    const ballance = Number(cachedWalletJSON?.ballance || 0) + transactionValue;

    // CALCULATE WALLET BALANCE IN MEMORY
    const wallet: Wallet = {
      userId: walletDTO.userId,
      name: walletDTO.walletName,
      ballance,
    };

    // SET NEW WALLET IN MEMORY
    this.redis.set(walletKey, JSON.stringify(wallet));

    // ADD THE DATABASE UPDATE ASYNC
    this.walletQueue.add(walletKey, wallet);

    // RETURN WALLET DATA
    return wallet;
  }
}

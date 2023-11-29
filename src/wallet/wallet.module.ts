import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { PrismaService } from 'src/database/prismaService';
import { TransactMiddleware } from 'src/middleware/transact.middleware';
import { WalletRepository } from '../repository/wallet.repository';
import { WalletPrismaRepository } from 'src/repository/prisma/wallet-prisma.repository';
import { WalletRedisRepository } from 'src/repository/cache/wallet-redis.repository';
import { RedisService } from 'src/config/redis';
import { WalletCacheRepository } from 'src/repository/wallet-cache.repository';
import { BullModule } from '@nestjs/bullmq';
import { queueNames } from 'src/utils';
import { WalletProcessor } from 'src/queue/wallet.processor';

@Module({
  imports: [
    /**
     * CONNECT WITH REDIS BY DEFAULT CREDENTIALS
     */
    BullModule.registerQueue({
      name: queueNames.WALLET,
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
    BullModule.registerFlowProducer({
      name: `${queueNames.WALLET}-producer`,
      connection: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
      },
    }),
  ],
  controllers: [WalletController],
  providers: [
    WalletService,
    RedisService,
    PrismaService,
    /**
     * Using abstract class to decouple the project from the CACHE dependency.
     */
    {
      provide: WalletCacheRepository,
      useClass: WalletRedisRepository, // we can change cache tool
    },
    /**
     * Using abstract class to decouple the project from the PRISMA dependency.
     */
    {
      provide: WalletRepository,
      useClass: WalletPrismaRepository, // we can change ORM tool
    },
    // QUEUE PROCESSORS
    WalletProcessor,
  ],
})
export class WalletModule implements NestModule {
  // CONFIGURE MIDDLEWARE VALIDATION
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(TransactMiddleware).forRoutes(WalletController);
  }
}

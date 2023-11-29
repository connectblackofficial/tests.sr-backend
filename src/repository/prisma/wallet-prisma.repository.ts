import { Injectable } from '@nestjs/common';
import { Wallet } from '@prisma/client';
import { PrismaService } from 'src/database/prismaService';
import { WalletDTO } from 'src/wallet/dto/transact-wallet.dto';
import { WalletRepository } from 'src/repository/wallet.repository';

@Injectable()
export class WalletPrismaRepository implements WalletRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findUnique(name: string, userId: string): Promise<Wallet> {
    return await this.prisma.wallet.findUnique({
      where: {
        name_userId: {
          name,
          userId,
        },
      },
    });
  }

  async transact(walletDTO: Wallet): Promise<Wallet> {
    return await this.prisma.wallet.upsert({
      where: {
        name_userId: {
          name: walletDTO.name,
          userId: walletDTO.userId,
        },
      },
      update: {
        ballance: walletDTO.ballance,
        // ballance: {
        //   /**
        //    * By using atomic operations such as 'increment' or 'decrement',
        //    * we guarantee the correct updating of data in a competitive environment (microservices),
        //    * as the update will be carried out by transaction directly in the database.
        //    *
        //    * https://www.prisma.io/docs/concepts/components/prisma-client/crud#update-a-number-field
        //    * https://www.prisma.io/docs/reference/api-reference/prisma-client-reference#atomic-number-operations
        //    */
        //   increment: transactionValue,
        // },
      },
      create: walletDTO,
    });
  }
}

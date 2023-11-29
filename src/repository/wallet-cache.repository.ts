import { Wallet } from '@prisma/client';
import { WalletDTO } from '../wallet/dto/transact-wallet.dto';

export abstract class WalletCacheRepository {
  abstract findUnique(name: string, userId: string): Promise<Wallet>;
  abstract transact(
    walletDTO: WalletDTO,
    transactionValue: number,
  ): Promise<Wallet>;
}

import { Wallet } from '@prisma/client';

export abstract class WalletRepository {
  abstract findUnique(name: string, userId: string): Promise<Wallet>;
  abstract transact(walletDTO: Wallet): Promise<Wallet>;
}

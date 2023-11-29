import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { transactionOperationTypes } from 'src/utils';
import { WalletDTO } from './dto/transact-wallet.dto';
import { WalletCacheRepository } from 'src/repository/wallet-cache.repository';

@Injectable()
export class WalletService {
  constructor(private walletCacheRepository: WalletCacheRepository) {}

  async transact(walletDTO: WalletDTO, operation: transactionOperationTypes) {
    try {
      const { ballance } = walletDTO;

      // CHECK IF WE HAVE NEGATIVE BALLANCE
      await this.checkNegativeBalance(walletDTO, operation);

      // CREATE THE FINAL TRANSACTION VALUE (NEGATIVE OR POSITIVE) BY THE OPERATION TYPE
      const transactionValue: number =
        operation === transactionOperationTypes.SUBTRACT
          ? ballance * -1
          : ballance;

      // CREATE OR UPDATE THE VALUES IN WALLET
      const wallet = await this.walletCacheRepository.transact(
        walletDTO,
        transactionValue,
      );

      return {
        message: 'Operation successful',
        updateBalance: wallet.ballance,
      };
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.BAD_REQUEST);
    }
  }

  async checkNegativeBalance(
    walletDTO: WalletDTO,
    operation: transactionOperationTypes,
  ) {
    // GET WALLET CURRENT INFO
    const { userId, ballance, walletName: name } = walletDTO;
    const wallet = await this.walletCacheRepository.findUnique(name, userId);

    // CHECK IF WE HAVE SUFICIENT AMOUT TO SUBTRACT
    if (
      (operation === transactionOperationTypes.SUBTRACT && !wallet) ||
      (operation === transactionOperationTypes.SUBTRACT &&
        wallet?.ballance < ballance)
    )
      throw new HttpException('Insuficient Funds', HttpStatus.BAD_REQUEST);
  }
}

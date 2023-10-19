import { Wallet, WalletRequestBody } from '../models/wallet';
import { connDatasource } from '../config/database';

/**
 * Class to sync wallet balances in MySQL.
 */
class SyncBalance {
  async process(payload: WalletRequestBody[], key: string): Promise<number> {
    await connDatasource.createQueryBuilder().insert().into(Wallet).values(payload).execute();

    const { sum } = await connDatasource
      .getRepository(Wallet)
      .createQueryBuilder('wallet')
      .select('SUM(wallet.balance)', 'sum')
      .where('wallet.reference = :reference', { reference: key })
      .getRawOne();

    return sum;
  }
}

export default SyncBalance;

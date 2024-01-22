import IWallet from "../interfaces/wallet/Wallet";
import SequelizeWallet from "../database/models/SequelizeWallet";
import { IWalletModel } from "../interfaces/wallet/WalletModel";
import { NewEntity } from "../interfaces/User/UserModel";

export default class WalletModel implements IWalletModel {
  private model = SequelizeWallet;

  async createWallet(userId : IWallet['userId'], { balance, walletName }: NewEntity<IWallet>)
  : Promise<IWallet> {
    const newWallet = await this.model.create({ userId, balance, walletName });
    return newWallet;
  }

  async getAllWallets() {
    const wallets = await this.model.findAll();
    return wallets;
  }
  
  async findById(id: number): Promise<IWallet | null> {
    const wallet = await this.model.findByPk(id);
    if (wallet == null) return null;

    return wallet;
  }

  async update(id: number, balance: number, walletName: string): Promise<IWallet | null> {
    const [affectedRows] = await this.model.update({ balance, walletName }, { where: { id } });

    if(affectedRows === 0) return null;

    return this.findById(id);
  }

  async getWalletByUserId(userId : IWallet['userId']) {
    const wallet = await this.model.findOne({ where: { userId } });

    if (wallet == null) return null;

    return wallet;
  }
}
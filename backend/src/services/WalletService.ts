import WalletModel from "../models/WalletModel";
import IWallet from "../interfaces/wallet/Wallet";
import { NewEntity } from "../interfaces/User/UserModel";
import { ServiceMessage, ServiceResponse } from "../interfaces/ServiceResponse";

export default class WalletService {
  constructor(
    private walletModel = new WalletModel(),
  ) { }

  public async getAll() {
    const wallets = await this.walletModel.getAllWallets();
    return { status: "SUCCESSFUL", data: wallets };
  }

  public async create(userId: IWallet['userId'], wallet: NewEntity<IWallet>)
  : Promise<ServiceResponse<IWallet>> {
    const validateWallet = await this.walletModel.getWalletByUserId(userId);

    if (validateWallet !== null) {
      return { status: 'CONFLICT', data: { message: 'Wallet already created' } }
    }

    const newWallet = await this.walletModel.createWallet(userId, wallet);
    return { status: 'SUCCESSFUL', data: newWallet };
  }

  public async getById(id: IWallet['id']) : Promise<ServiceResponse<IWallet>> {
    const getByWalletId = await this.walletModel.findById(id);
    if (getByWalletId === null) return { status: 'NOT_FOUND', data: { message: 'Wallet not found' } }
    return { status: 'SUCCESSFUL', data: getByWalletId }
  }

  public async getByWalletUserId(userId: IWallet['userId']) : Promise<ServiceResponse<IWallet>> {
    const getWallet = await this.walletModel.getWalletByUserId(userId);
    if (getWallet === null) return { status: 'NOT_FOUND', data: { message: 'Wallet not found' } }
    return { status: 'SUCCESSFUL', data: getWallet }
  }

  public async walletAdd({ balance, userId, walletName }: NewEntity<IWallet>)
  : Promise<ServiceResponse<IWallet>> {
    const validateWallet = await this.walletModel.getWalletByUserId(userId);

    if (validateWallet == null) {
      return {
        status: 'NOT_FOUND',
        data: { message: 'wallet not found, please create a wallet' }
      }
    }

    balance = balance + validateWallet.balance;

    const addWallet = await this.walletModel.update(validateWallet.id, balance, walletName);
    if (addWallet === null) {
      return {
        status: 'CONFLICT',
        data: { message: 'Unable to add balance to wallet' }
      }
    }

    return { status: 'SUCCESSFUL', data: addWallet }
  }
  
  public async walletSubtract({ balance, userId, walletName } : NewEntity<IWallet>)
  : Promise<ServiceResponse<IWallet>> {
    const validateWallet = await this.walletModel.getWalletByUserId(userId);

    if (validateWallet == null) {
      return { status: 'NOT_FOUND', data: { message: 'Wallet not found' } }
    }

    if (validateWallet.balance < balance) {
      return { status: 'BAD_REQUEST', data: { message: 'Insufficient funds' } }
    }

    balance = validateWallet.balance - balance;

    const subtractWallet = await this.walletModel.update(validateWallet.id, balance, walletName);
    if (!subtractWallet) {
      return {
        status: 'CONFLICT',
        data: { message: 'Unable to add balance to wallet' }
      }
    }

    return { status: 'SUCCESSFUL', data: subtractWallet }
  }
}
import { NewEntity } from "../User/UserModel";
import IWallet from "./Wallet";

export interface IWalletModel {
  findById(id: IWallet['id']) : Promise<IWallet | null>;
  createWallet(userId : IWallet['userId'], wallet: NewEntity<IWallet>) : Promise<IWallet>;
  update(id: IWallet['id'], balance: IWallet['balance'], walletName: string) : Promise<IWallet | null>
}
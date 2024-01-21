import { DataTypes, Model, QueryInterface } from "sequelize";
import IWallet from "../../interfaces/wallet/Wallet";
export default {
  up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<IWallet>>('wallets', {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        },
      },
      balance: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      walletName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'wallet_name'
      }
    });
  },
  down(queryInterface : QueryInterface) {
    return queryInterface.dropTable('wallets')
  }
}
import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";
import db from '.';
import SequelizeUser from "./SequelizeUser";

class SequelizeWallet extends Model<InferAttributes<SequelizeWallet>,
InferCreationAttributes<SequelizeWallet>> {
  declare id: CreationOptional<number>;
  declare userId: number;
  declare walletName: string;
  declare balance: number;
}

SequelizeWallet.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    field: 'user_id'
  },
  walletName: {
    type: DataTypes.STRING,
    allowNull: false,
    field: "wallet_name"
  },
  balance: {
    type: DataTypes.FLOAT,
    allowNull: false,
  }
}, {
  sequelize: db,
  timestamps: false,
  tableName: 'wallets',
  underscored: true,
});

SequelizeWallet.belongsTo(SequelizeUser, { foreignKey: 'userId', as: 'user' });
SequelizeUser.hasOne(SequelizeWallet, { foreignKey: 'userId', as: 'wallet' });

export default SequelizeWallet;
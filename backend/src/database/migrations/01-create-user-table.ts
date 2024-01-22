import { DataTypes, Model, QueryInterface } from "sequelize";
import IUser from "../../interfaces/User/User";
export default {
  up(queryInterface : QueryInterface) {
    return queryInterface.createTable<Model<IUser>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      fullName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      phone: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    })
  },
  down(queryInterface : QueryInterface) {
    return queryInterface.dropTable('users');
  },
}
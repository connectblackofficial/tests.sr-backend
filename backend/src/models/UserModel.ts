import IUser from "../interfaces/User/User";
import SequelizeUser from "../database/models/SequelizeUser";
import { IUserModel, NewEntity } from '../interfaces/User/UserModel';

export default class UserModel implements IUserModel {
  private model = SequelizeUser;

  async findById(id: number): Promise<IUser | null> {
    const user = this.model.findByPk(id);
    return user == null ? null : user;
  }

  async findAll() {
    const getAllUsers = await this.model.findAll();
    return getAllUsers;
  }

  async createUser(user: NewEntity<IUser>): Promise<IUser> {
    const newUser = await this.model.create(user);
    return newUser;
  }

  async findByEmail(email: string): Promise<IUser | null> {
    const user =  this.model.findOne({ where: { email } });

    if (user ==  null) return null;

    return user;
  }
}

import UserModel from "../models/UserModel";
import IUser from "../interfaces/User/User";
import { IUserModel, NewEntity } from "../interfaces/User/UserModel";
import { ServiceMessage, ServiceResponse } from "../interfaces/ServiceResponse";

export default class UserService {
  constructor (
    private userModel = new UserModel(),
  ) { }

  public async createUser(user : NewEntity<IUser>) : Promise<ServiceResponse<IUser>> {
    const validatingIfTheUserExists = await this.userModel.findByEmail(user.email);

    if (validatingIfTheUserExists !== null) {
      return { status: 'CONFLICT', data: { message: 'user already registered' } }
    }

    const newUser = await this.userModel.createUser(user);
    return { status: 'SUCCESSFUL', data: newUser };
  }

  public async getByUserId(id: number) : Promise<ServiceResponse<IUser>> {
    const user = await this.userModel.findById(id);

    if (!user) return { status: 'NOT_FOUND', data: { message: `User ${id} not found` } };

    return { status: 'SUCCESSFUL', data: user };
  }

  public async getAllUsers() {
    const users = await this.userModel.findAll();
    return { status: 'SUCCESSFUL', data: users };
  }
}
import IUser from "./User";

export interface IUserModel {
  findById(id: number): Promise<IUser | null>;
  createUser(user: Partial<IUser>) : Promise<IUser>;
  findByEmail(email: IUser['email']) : Promise<IUser | null>;
}

export type NewEntity<T> = Omit<T, 'id'>;

export interface ILogin {
  email: string;
  password: string;
}
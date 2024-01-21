import { Request, Response } from "express";
import UserModel from "../models/UserModel";
import JwtUtils from "../utils/jwtUtils";
import { ILogin } from "../interfaces/User/UserModel";

export default class LoginController {
  private jwtUtils = new JwtUtils();
  private model: UserModel = new UserModel();

  async login(req : Request, res : Response) {
    const { email, password } = req.body as ILogin;
    const user = await this.model.findByEmail(email);

    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    if (password !== user.password) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = this.jwtUtils.sign({ id: user.id });

    return res.status(200).json({
      token,
    });
  }

  async loginRole(_req : Request, res : Response) {
    const id = res.locals.userId;

    const user = await this.model.findById(id);
    if (!user) return res.status(401).json({ message: 'user not found' });

    return res.status(200).json({ message: 'Authenticated user' });
  }
}
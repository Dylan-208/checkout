import type { Request, Response } from "express";
import { loginSchema, userSchema } from "./schemas/userSchema.js";
import type User from "../models/user.js";
import userServiceFactory from "../factories/userServiceFactory.js";

class UserController {
  async create(req: Request, res: Response) {
    try {
      await userSchema.validate(req.body);

      const { email, password, name, isAdmin, cep } = req.body as User;

      const data = { email, password, name, isAdmin, cep };

      const response = await userServiceFactory.create(data);

      res.status(201).json(response);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async login(req: Request, res: Response) {
    try {
      await loginSchema.validate(req.body);

      const { email, password } = req.body as User;

      const login = { email, password };

      const response = await userServiceFactory.login(login);
      res.status(200).json(response);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default UserController;

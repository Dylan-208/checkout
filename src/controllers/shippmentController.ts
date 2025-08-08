import shippmentServiceFactory from "../factories/shippmentServiceFactory.js";
import { shippmentSchema } from "./schemas/shippmentSchema.js";
import type { Request, Response } from "express";

class ShippmentController {
  async create(req: Request, res: Response) {
    try {
      await shippmentSchema.validate(req.body);

      const { destine_cep } = req.body;

      const { email } = (req as any).email;

      const result = await shippmentServiceFactory.create(email, destine_cep);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default ShippmentController;

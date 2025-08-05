import type { Request, Response } from "express";
import { cartSchema } from "./schemas/cartSchema.js";
import cartServiceFactory from "../factories/cartServiceFactory.js";

class CartController {
  async add(req: Request, res: Response) {
    try {
      await cartSchema.validate(req.body);
      const { product_id, quantity } = req.body;
      const dataCart = { product_id, quantity };
      const email = (req as any).email;

      const result = await cartServiceFactory.add(email, dataCart);

      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default CartController;

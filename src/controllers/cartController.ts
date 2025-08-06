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

  async get(req: Request, res: Response) {
    try {
      const email = (req as any).email;

      const result = await cartServiceFactory.get(email);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const email = (req as any).email;

      const id_cartItem = req.params.id;

      if (!id_cartItem)
        throw new Error("É necessário o id do Item no carrinho");

      const result = await cartServiceFactory.delete(email, id_cartItem);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default CartController;

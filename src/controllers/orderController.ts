import type { Request, Response } from "express";
import orderServiceFactory from "../factories/orderServiceFactory.js";

class OrderController {
  async create(req: Request, res: Response) {
    try {
      const email = (req as any).email;

      const result = await orderServiceFactory.create(email);

      res.status(201).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default OrderController;

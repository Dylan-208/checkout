import type { Request, Response } from "express";
import productsServiceFactory from "../factories/productsServiceFactory.js";
import { productsSchema } from "./schemas/productScheama.js";
class ProductsController {
  async getAll(req: Request, res: Response) {
    try {
      const result = await productsServiceFactory.getAll();
      res.status(200).json(result);
    } catch (err: any) {
      res.status(500).json({ error: err.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      await productsSchema.validate(req.body);

      const { name, price, stock, weight, height, width, length } = req.body;
      const email = (req as any).email;
      const data = { name, price, stock, weight, height, width, length };

      const response = await productsServiceFactory.create(data, email);

      res.status(201).json(response);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default ProductsController;

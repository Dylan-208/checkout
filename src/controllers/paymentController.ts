import type { Request, Response } from "express";
import { paymentSchema } from "./schemas/paymentSchema.js";
import paymentServiceFactory from "../factories/paymentServiceFactory.js";

class PaymentController {
  async create(req: Request, res: Response) {
    try {
      await paymentSchema.validate(req.body);

      const email = (req as any).email;
      const { order_id, payment_method, card_token, amount, installments } =
        req.body;
      const dataPayment = {
        order_id,
        payment_method,
        card_token,
        amount,
        installments,
      };

      const result = await paymentServiceFactory.create(email, dataPayment);

      res.status(200).json(result);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}

export default PaymentController;

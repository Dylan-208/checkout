import { Router } from "express";
import authMiddleware from "../factories/authMiddlewareFactory.js";
import PaymentController from "../controllers/paymentController.js";

const paymentsRouter = Router();
const paymentController = new PaymentController();

paymentsRouter.post("/paymenst", authMiddleware.user, paymentController.create);

export default paymentsRouter;

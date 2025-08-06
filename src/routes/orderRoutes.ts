import { Router } from "express";
import authMiddleware from "../factories/authMiddlewareFactory.js";
import OrderController from "../controllers/orderController.js";

const orderRouter = Router();
const orderController = new OrderController();

orderRouter.post("/order", authMiddleware.user, orderController.create);
orderRouter.get("/order", authMiddleware.user, orderController.getAll);

export default orderRouter;

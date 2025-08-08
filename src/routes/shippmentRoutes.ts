import { Router } from "express";
import authMiddleware from "../factories/authMiddlewareFactory.js";
import ShippmentController from "../controllers/shippmentController.js";

const shippmentRouter = Router();
const shippmentController = new ShippmentController();

shippmentRouter.post(
  "/shippment/calculate",
  authMiddleware.user,
  shippmentController.create
);

export default shippmentRouter;

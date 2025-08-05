import { Router } from "express";
import authMiddleware from "../factories/authMiddlewareFactory.js";
import CartController from "../controllers/cartController.js";

const cartRouter = Router();
const cartController = new CartController();
cartRouter.post("/cart", authMiddleware.user, cartController.add);

export default cartRouter;

import { Router } from "express";
import ProductsController from "../controllers/productsController.js";
import authMiddleware from "../factories/authMiddlewareFactory.js";

const productsRouter = Router();
const productsController = new ProductsController();

productsRouter.get("/products", productsController.getAll);
productsRouter.post(
  "/products",
  authMiddleware.user,
  productsController.create
);

export default productsRouter;

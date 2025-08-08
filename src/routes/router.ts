import { Router } from "express";
import userRouter from "./userRoutes.js";
import productsRouter from "./productsRoutes.js";
import cartRouter from "./cartRoutes.js";
import orderRouter from "./orderRoutes.js";
import paymentsRouter from "./paymentsRoutes.js";
import shippmentRouter from "./shippmentRoutes.js";

const router = Router();

router.use(userRouter);
router.use(productsRouter);
router.use(cartRouter);
router.use(orderRouter);
router.use(paymentsRouter);
router.use(shippmentRouter);

export default router;

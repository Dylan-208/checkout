import { Router } from "express";
import userRouter from "./userRoutes.js";
import productsRouter from "./productsRoutes.js";
import cartRouter from "./cartroutes.js";
import orderRouter from "./orderRoutes.js";
import paymentsRouter from "./paymentsRoutes.js";

const router = Router();

router.use(userRouter);
router.use(productsRouter);
router.use(cartRouter);
router.use(orderRouter);
router.use(paymentsRouter);

export default router;

import { Router } from "express";
import userRouter from "./userRoutes.js";
import productsRouter from "./productsRoutes.js";
import cartRouter from "./cartroutes.js";

const router = Router();

router.use(userRouter);
router.use(productsRouter);
router.use(cartRouter);

export default router;

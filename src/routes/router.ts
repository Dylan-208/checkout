import { Router } from "express";
import userRouter from "./userRoutes.js";
import productsRouter from "./productsRoutes.js";

const router = Router();

router.use(userRouter);
router.use(productsRouter);

export default router;

import { Router } from "express";
import userRouter from "./user.route.js";
import insuranceRouter from "./insurance.route.js";
import insuredRouter from "./Insured.route.js";
import authRouter from "./auth.route.js";
//import swaggerRouter from "./swagger.route.js";

const router = Router();

router.use("/user", userRouter);
router.use("/insurances", insuranceRouter);
router.use("/insureds", insuredRouter);
router.use("/auth", authRouter);
//router.use("/doc", swaggerRouter);

export default router;

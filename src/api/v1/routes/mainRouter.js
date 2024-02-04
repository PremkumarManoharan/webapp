import healthzRouter from "./healthz.js";
import userRouter from "./user.js";
import express from 'express';
const mainRouter = express.Router();
mainRouter.use("/healthz", healthzRouter);
mainRouter.use("/v1/user", userRouter)
export default mainRouter;

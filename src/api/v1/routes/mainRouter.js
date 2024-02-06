import userRouter from "./user.js";
import healthzRouter from "./healthz.js";
import express from 'express';
const mainRouter = express.Router();
mainRouter.use("/healthz", healthzRouter);
mainRouter.use("/v1/user", userRouter)

mainRouter.use((req, res, next) => {
    res.status(404).end();
});

export default mainRouter;

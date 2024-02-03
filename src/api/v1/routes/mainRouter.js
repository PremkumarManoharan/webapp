import healthzRouter from "./healthz.js";
import express from 'express';
const mainRouter = express.Router();
mainRouter.use("/healthz", healthzRouter);

export default mainRouter;

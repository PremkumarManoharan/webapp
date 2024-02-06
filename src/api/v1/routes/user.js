import express from "express"
import {userController,healthzController} from '../controller/controllers.js'
import { basicAuth,checkDB} from "../middleware/authentication.js";
const userRouter = express.Router();
userRouter.use(express.urlencoded({extended: true})); //TODO: handle other than json body
userRouter.use(express.json());
userRouter.use(userController.allowOnlyMethod);
userRouter.use(userController.checkQueryParam);
userRouter.route('/').post([checkDB,userController.checkPayload],userController.createUser);
userRouter.route('/self').get([checkDB,basicAuth],userController.getUser);
userRouter.route('/self').put([checkDB,basicAuth],userController.updateUser);

userRouter.use((req, res, next) => {
    res.status(404).end();
});
export default userRouter;

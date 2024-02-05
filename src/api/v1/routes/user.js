import express from "express"
import bodyParser from "body-parser";
import {userController} from '../controller/controllers.js'

const userRouter = express.Router();
userRouter.use(express.urlencoded({extended: true})); //TODO: handle other than json body
userRouter.use(express.json());
userRouter.use(userController.allowOnlyMethod);
userRouter.use(userController.checkQueryParam);
userRouter.route('/').post(userController.createUser);
userRouter.use(userController.basicAuth);
userRouter.route('/self').get(userController.getUser);
userRouter.route('/self').put(userController.updateUser);

export default userRouter;

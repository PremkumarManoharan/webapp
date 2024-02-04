import express from "express"
import bodyParser from "body-parser";
import {userController} from '../controller/controllers.js'

const userRouter = express.Router();
userRouter.use(express.urlencoded({extended: true}));
userRouter.use(express.json());
userRouter.use(userController.checkQueryParam);
userRouter.route('/').post(userController.createUser);

export default userRouter;

import express from "express"
import {userController} from '../controller/controllers.js'
import { basicAuth,checkDB} from "../middleware/authentication.js";
import { validatePostAttributes, validatePutAttributes } from "../middleware/validation.js";
const userRouter = express.Router();

userRouter.use(userController.allowOnlyMethod);

userRouter.route('/').post(
    [
    userController.checkPayload,
    userController.checkQueryParam,
    checkDB,
    validatePostAttributes(['username', 'password', 'first_name', 'last_name'])
    ],userController.createUser);

userRouter.route('/self').get([checkDB,basicAuth,userController.checkQueryParam],userController.getUser);


userRouter.route('/self').put(
    [checkDB,
    basicAuth,
    userController.checkQueryParam,
    validatePutAttributes(['password', 'first_name', 'last_name'])
    ],userController.updateUser);

userRouter.route('/verify').get(userController.verifyUser);

userRouter.use((req, res, next) => {
    res.status(404).end();
});
export default userRouter;

import express from "express"
import {userController} from '../controller/controllers.js'
const userRouter = express.Router();
userRouter.use(express.urlencoded({extended: true})); //TODO: handle other than json body
userRouter.use(express.json());
userRouter.use(userController.allowOnlyMethod);
userRouter.use(userController.checkQueryParam);
userRouter.route('/').post(userController.createUser);
userRouter.route('/self').get(userController.getUser);
userRouter.route('/self').put(userController.updateUser);

userRouter.use((req, res, next) => {
    res.status(404).end();
});
export default userRouter;

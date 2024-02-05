import express from "express"
import {healthzController} from '../controller/controllers.js'
const healthzRouter = express.Router()

healthzRouter.use(healthzController.allowOnlyGetMethod);
healthzRouter.use(healthzController.checkPayload);
healthzRouter.use(healthzController.checkQueryParam);
healthzRouter.route('/').get(healthzController.getHealthz);

export default healthzRouter;

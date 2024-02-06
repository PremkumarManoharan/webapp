import express from "express"
import {healthzController} from '../controller/controllers.js'
const healthzRouter = express.Router()

healthzRouter.use(healthzController.allowOnlyGetMethod);
healthzRouter.use(healthzController.checkPayload);
healthzRouter.use(healthzController.checkQueryParam);
healthzRouter.route('/').get(healthzController.getHealthz);

healthzRouter.use((req, res, next) => {
    res.status(404).end();
});
export default healthzRouter;

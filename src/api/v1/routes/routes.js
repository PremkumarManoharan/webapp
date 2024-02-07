import { checkJsonSyntax } from '../middleware/validation.js';
import mainRouter from './mainRouter.js';
export default (app) => {
    app.use(checkJsonSyntax);
    app.use('/',mainRouter);
}

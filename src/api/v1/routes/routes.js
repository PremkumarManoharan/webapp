import mainRouter from './mainRouter.js';

export default (app) => {
    app.use('/',mainRouter)
}

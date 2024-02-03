import express from "express"
import routes from './routes/routes.js'

const app = express();
routes(app);

export default app;

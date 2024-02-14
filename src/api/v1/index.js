import express from "express"
import routes from './routes/routes.js'
global.db_status = false;
const app = express();
app.use(express.json());
routes(app);

export default app;

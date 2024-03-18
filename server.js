import app from "./src/api/v1/index.js";
import { logger } from "./src/api/v1/config/loggerConfig.js";
const server  = app.listen(3000, ()=> { // move port to .env
    logger.info('Server running on port 3000');
});

export default server; 

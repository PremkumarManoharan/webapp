import { AuthenticationService } from "../services/basicAuthService.js";
import { sequelize } from "../config/dbConfig.js"
import { logger } from "../config/loggerConfig.js";


export const basicAuth = async (req, res, next) => {
    try {
        const auth = await AuthenticationService.auth(req, res);
        logger.info("Authentication completed");
        next();
    } catch (error) {
        res.status(401).end();
    }
};

export const checkDB = async (req, res, next) => {
    sequelize.authenticate().then(() => {
        res.header('Cache-Control', 'no-cache');
        res.status(200);
        next();
    }).catch((e) => {
        res.header('Cache-Control', 'no-cache');
        res.status(503).end();
        logger.error(e);
    })
};

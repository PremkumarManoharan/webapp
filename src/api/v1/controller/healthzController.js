import {sequelize} from "../config/dbConfig.js"

//Check connection with DB and return 200 if ok or else 503
export const getHealthz = async (req, res) => {
    sequelize.authenticate().then(() => {
        res.header('Cache-Control', 'no-cache');
        res.status(200).end();
      }).catch((e) => {
        res.header('Cache-Control', 'no-cache');
        res.status(503).end();
        console.log(e);
      })
};


//Check if payload present if yes return 400 or else go to next step
export const checkPayload = (req, res, next) => {
    if (req.header('Content-Type')) {
        res.header('Cache-Control', 'no-cache');
        return res.status(400).end();
    }
    next();
};

//Check if query param present if yes return 400 or else go to next step
export const checkQueryParam = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        res.header('Cache-Control', 'no-cache');
        return res.status(400).end();
    }
    next();
};

//Check method type only GET if yes return continue or else return 405
export const allowOnlyGetMethod = (req, res, next) => {
    if (req.method !== 'GET') {
        res.header('Cache-Control', 'no-cache');
        return res.status(405).end();
    } else {
      next();
    }
};

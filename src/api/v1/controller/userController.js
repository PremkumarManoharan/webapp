import { AuthenticationService } from "../services/basicAuthService.js";
import { UserService } from "../services/userService.js"


//Doubt: 400 or 409 for validation
export const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        if(error.message === "DB_down"){
            console.log(error.message);
            res.status(503).end();
        }else{
            console.log(error.message);
            res.status(400).end();
        }
    }
};

export const checkQueryParam = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        res.header('Cache-Control', 'no-cache');
        return res.status(400).end();
    }
    next();
};

export const basicAuth = async (req, res, next) => {
    try {
        const auth = await AuthenticationService.auth(req, res, next);
        console.log("Auth completed");
        res.status(200);
    } catch (error) {
        if(error.message === "DB_down"){
            console.log(error.message);
            res.status(503).end();
        }else{
            console.log(error.message);
            res.status(401).end();
        }
        next();
    }
};

export const getUser = async (req, res) => {
    try {
        const authUser = await AuthenticationService.getUserfromAuthHeader(req);
        // console.log("Header User:"+authUser)
        const user = await UserService.getUser(authUser);
        // console.log(user);
        res.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(401).end();
    }
};

export const updateUser = async (req, res) => {
    try {
        const authUser = await AuthenticationService.getUserfromAuthHeader(req);
        // console.log("Header User:"+authUser)
        await UserService.updateUser(authUser, req.body);
        // console.log(user);
        res.status(204).end();
    } catch (error) {
        console.log(error.message);
        res.status(400).end();
    }
};

export const allowOnlyMethod = (req, res, next) => {
    if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT') {
        next();
    } else {
        res.header('Cache-Control', 'no-cache');
        return res.status(405).end();
    }
};

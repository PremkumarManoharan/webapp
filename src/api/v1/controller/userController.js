import { AuthenticationService } from "../services/basicAuthService.js";
import { UserService } from "../services/userService.js"


export const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).send(user);
    }
    catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
};

export const getUser = async (req, res) => {

    try {
        const authUser = await AuthenticationService.getUserfromAuthHeader(req);
        const user = await UserService.getUser(authUser);
        res.status(200).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(401).end();
    }
};

export const updateUser = async (req, res) => {
    try {
        const authUser = await AuthenticationService.getUserfromAuthHeader(req);
        await UserService.updateUser(authUser, req.body);
        res.status(204).end();
    } catch (error) {
        console.log(error.message);
        res.status(400).send(error.message);
    }
};

export const checkQueryParam = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        return res.status(400).end();
    }
    next();
};

export const allowOnlyMethod = (req, res, next) => {
    if (req.method === 'GET' || req.method === 'POST' || req.method === 'PUT') {
        next();
    } else {
        return res.status(405).end();
    }
};

export const checkPayload = (req, res, next) => {
    if (!req.header('Content-Type')) {
        res.header('Cache-Control', 'no-cache');
        return res.status(400).send("Missing Payload");
    }
    next();
};

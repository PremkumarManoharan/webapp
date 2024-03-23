import { logger } from "../config/loggerConfig.js";
import { AuthenticationService } from "../services/basicAuthService.js";
import { UserService } from "../services/userService.js"


export const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).send(user);
    }
    catch (error) {
        logger.error(error.message);
        res.status(400).end();
    }
};

export const getUser = async (req, res) => {

    try {
        const authUser = await AuthenticationService.getUserfromAuthHeader(req);
        const user = await UserService.getUser(authUser);
        res.status(200).send(user);
    } catch (error) {
        logger.error(error.message);
        res.status(401).end();
    }
};

export const emailSent = async (req, res) => {
   
    try {
        const username = req.query.username
        const user = await UserService.emailSent(username);
        res.status(200).end();
    } catch (error) {
        logger.error(error.message);
        res.status(400).end();
    }
};

export const updateUser = async (req, res) => {
    try {
        const authUser = await AuthenticationService.getUserfromAuthHeader(req);
        await UserService.updateUser(authUser, req.body);
        res.status(204).end();
    } catch (error) {
        logger.error(error.message);
        res.status(400).end();
    }
};



export const verifyUser = async (req, res) => {
    try {
        const token = req.query.token;
        const username = req.query.username
        await UserService.updateVerifiedUser(username, token);
        const htmlContent = `
        <html>
          <head>
            <title>Email Verification</title>
          </head>
          <body>
            <h1>Email Verified Successfully!</h1>
            <p>Your email has been successfully verified. You can now access all the apis.</p>
          </body>
        </html>
      `;
    
      // Send the HTML content as the response
      res.send(htmlContent);
    } catch (error) {
        logger.error(error.message);
        const htmlContent = `
        <html>
          <head>
            <title>Email Verification</title>
          </head>
          <body>
            <h1>Link Expired</h1>
            <p>Your email is not verified</p>
          </body>
        </html>
      `;
        res.status(410).send(htmlContent);
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
        return res.status(400).end();
    }
    next();
};

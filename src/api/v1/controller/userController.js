import {UserService} from "../services/userService.js"
import { Sequelize } from "sequelize";
//TODO: POST method to create user
//Doubt: 400 or 409 for validation
export const createUser = async (req, res) => {
    try {
        const user = await UserService.createUser(req.body);
        res.status(201).send(user);
    } catch (error) {
        console.log(error.message);
        res.status(400).end();
    }
};

export const checkQueryParam = (req, res, next) => {
    if (Object.keys(req.query).length > 0) {
        res.header('Cache-Control', 'no-cache');
        return res.status(400).end();
    }
    next();
};

//TODO: Get method to get user (self only)


//TODO: PUT methos to update user (self only)

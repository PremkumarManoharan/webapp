import { logger } from "../config/loggerConfig.js";
import {User} from "../model/user.js"
import bcrypt from 'bcrypt';
import { publishMessage } from "./sendEmailService.js";
import crypto from 'crypto';

function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

export class UserService {
    // Create a new user
    static async createUser(userData) {
        try {
            // Check if the user already exists
            const existingUser = await User.findOne({ where: { username: userData.username } });
            if (existingUser) {
                throw new Error('User already exists with this email');
            } else if (!validateEmail(userData.username)) {
                throw new Error('Invalid email format');
            } else if(userData.first_name === "" || userData.last_name === "" || userData.password === "" || userData.username === "" ){
                throw new Error('cannot accept empty values');
            }
            const { first_name, last_name, password, username } = userData;
            const token = crypto.randomBytes(20).toString('hex');
            const bCryptPassword = await bcrypt.hash(btoa(password), 10);
            const user = await User.create({
                username: username,
                password: bCryptPassword,
                first_name: first_name,
                last_name: last_name,
                token: token
            });
            logger.debug(user.username+" User created Successfully");
            delete user.dataValues.password;
            delete user.dataValues.verified;
            delete user.dataValues.tokenValidity;
            if(process.env.NODE !== "test"){
                publishMessage(process.env.TOPIC_EMAIL,user.dataValues);
            }
            delete user.dataValues.token;
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUser(userData) {
        try {
            const existingUser = await User.findOne({ where: { username: userData.username } });
            delete existingUser.dataValues.password;
            delete existingUser.dataValues.token
            delete existingUser.dataValues.verified
            delete existingUser.dataValues.tokenValidity
            logger.debug(existingUser.username+" User retrieved Successfully");
            return existingUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async isVerified(userData) {
        try{
            const existingUser = await User.findOne({ where: { username: userData.username } });
            return existingUser;
        }catch(error){
            throw new Error(error.message)
        }
        
    };

    static async updateVerifiedUser(username, token) {
        try {
            const user = await User.findOne({ where: { username: username } });
            const now = new Date();
            if(!(user)){
                throw new Error("User Not Exist");
            }
            if(user.verified){
                throw new Error("User Already Verified");
            }
            if(user.tokenValidity > now){
                if(token === user.token){
                    user.update({
                        verified: true
                    });
                    logger.info(user.username+" User verified Successfully");
                }else{
                    throw new Error("Token invalid");
                }
            }else{
                throw new Error("Link expired");
            }
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async updateUser(userData, newData) {
        try {
            const user = await User.findOne({ where: { username: userData.username } });
            if(newData.first_name === "" || newData.last_name === "" || newData.password ===""){
                throw new Error('cannot accept empty values');
            }
            if (user) {
                if (user.first_name !== newData.first_name) {
                    user.update({
                        first_name: newData.first_name
                    });
                    logger.debug(user.username+" User first name updated Successfully");
                }
                if (user.last_name !== newData.last_name) {
                    user.update({
                        last_name: newData.last_name
                    });
                    logger.debug(user.username+" User lastname name updated Successfully");
                }
                if (newData.password !== undefined && !(await bcrypt.compare(btoa(newData.password), user.password))) {
                    const bCryptPassword = await bcrypt.hash(btoa(newData.password), 10);
                    user.update({
                        password: bCryptPassword
                    });
                    logger.debug(user.username+" User password updated Successfully");
                }

            } else {
                throw new Error('User not exist');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

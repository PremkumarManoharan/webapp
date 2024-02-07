import {User} from "../model/user.js"
import bcrypt from 'bcrypt';

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
            }
            const { first_name, last_name, password, username } = userData;
            const bCryptPassword = await bcrypt.hash(btoa(password), 10);
            const user = await User.create({
                username: username,
                password: bCryptPassword,
                first_name: first_name,
                last_name: last_name
            });
            delete user.dataValues.password;
            return user;
        } catch (error) {
            throw new Error(error.message);
        }
    }

    static async getUser(userData) {
        try {
            const existingUser = await User.findOne({ where: { username: userData.username } });
            delete existingUser.dataValues.password;
            return existingUser;
        } catch (error) {
            throw new Error(error.message);
        }
    }


    static async updateUser(userData, newData) {
        try {
            const user = await User.findOne({ where: { username: userData.username } });
            if (user) {
                if (user.first_name !== newData.first_name) {
                    user.update({
                        first_name: newData.first_name
                    });
                }
                if (user.last_name !== newData.last_name) {
                    user.update({
                        last_name: newData.last_name
                    });
                }
                if (newData.password !== undefined && !(await bcrypt.compare(btoa(newData.password), user.password))) {
                    const bCryptPassword = await bcrypt.hash(btoa(newData.password), 10);
                    user.update({
                        password: bCryptPassword
                    });
                }

            } else {
                throw new Error('User not exist');
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

}

import bcrypt from 'bcrypt';
import {User,db_status} from "../model/user.js"

// Authentication middleware

export class AuthenticationService {

    static async auth(req, res, next) {
        try {
            if (!req.get('Authorization')) {
                throw new Error('Authorization Required');
            }else if(!db_status){
                throw new Error('DB_down');
            }
            else {
                const user = await this.getUserfromAuthHeader(req);
                // If credentials are not valid
                const existingUser = await User.findOne({ where: { username: user.username } });
                if (!(existingUser)) {
                    throw new Error('Invalid Username');
                } else if (!(await bcrypt.compare(btoa(user.password), existingUser.password))) {
                    throw new Error('Invalid Password');
                } else {
                    console.log(await bcrypt.compare(user.password, existingUser.password));
                    next();
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        };
    }

    static async getUserfromAuthHeader(req) {
        var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64')
            // <Buffer 75 73 65 72 6e 61 6d 65 3a 70 61 73 73 77 6f 72 64>
            .toString()
            // username:password
            .split(':')
            // ['username', 'password']

        var user = {
            username: credentials[0],
            password: credentials[1]
        }
        console.log(user);
        return user;

    }
}

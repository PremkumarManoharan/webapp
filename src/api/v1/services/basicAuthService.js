import bcrypt from 'bcrypt';
import {User} from "../model/user.js"


export class AuthenticationService {

    static async auth(req, res) {
        try {
            if (!req.get('Authorization')) {
                throw new Error('Authorization Required');
            }
            else {
                const user = await this.getUserfromAuthHeader(req);
                const existingUser = await User.findOne({ where: { username: user.username } });
                if (!(existingUser)) {
                    throw new Error('Invalid Username');
                } else if (!(await bcrypt.compare(btoa(user.password), existingUser.password))) {
                    throw new Error('Invalid Password');
                } else {
                    console.log(await bcrypt.compare(user.password, existingUser.password));
                }
            }
        }
        catch (error) {
            throw new Error(error.message);
        };
    }

    static async getUserfromAuthHeader(req) {
        var credentials = Buffer.from(req.get('Authorization').split(' ')[1], 'base64').toString().split(':')
        var user = {
            username: credentials[0],
            password: credentials[1]
        }
        console.log(user);
        return user;
    }
}

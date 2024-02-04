import User from "../model/user.js"


function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return regex.test(email);
}

function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return passwordRegex.test(password);
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
            } else if (!validatePassword(userData.password)) {
                throw new Error('Invalid Password format');
            }
            const user = await User.create(userData);
            return user;
        } catch (error) {
            throw new Error(`Error creating user: ${error.message}`);
        }
    }

}


// static async createUser(userData) {

//         // Validate password
//         if (!validatePassword(userData.password)) {
//             throw new Error('Password does not meet security requirements');
//         }

//         // Validate first and last name
//         if (!userData.firstName.trim() || !userData.lastName.trim()) {
//             throw new Error('First and last name must not be empty');
//         }

//         // Create user if all validations pass
//         const user = await User.create(userData);
//         return user;
//     } catch (error) {
//         throw new Error(`Error creating user: ${error.message}`);
//     }
// }

// // Example email validation function


// // Example password validation function
// function validatePassword(password) {
//     // Your password validation logic here
//     return true; // Replace with actual validation
// }

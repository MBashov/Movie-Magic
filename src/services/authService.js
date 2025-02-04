import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = '$1w$10$1KTze.DQ8FnS86EhYI9D2eX3vGbuCCyDjQaWtpiw/T8MwdO2QJ1rS';

export default {

    async register(userData) {
        // *Check if password match rePassword - Error handled in User Model with virtual Property!!!
        // if (userData.password !== userData.rePass) {
        //     throw new Error ('Password missmatch!');
        // }

        // Check if email exist
        const userCount = await User.countDocuments({ email: userData.email });
        if (userCount > 0) {
            throw new Error ('Email already exist!')
        }

        return User.create(userData);
    },

    async login(email, password) {
        // Check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        // Check if password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid password or password!');
        }

        // Generate token
        const paylod = {
            id: user.id,
            email: user.email
        }
        // TODO: Use async function
        const token = jwt.sign(paylod, SECRET, { expiresIn: '2h' });
        return token;
    }

}
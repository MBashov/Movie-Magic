import User from "../models/User.js"
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const SECRET = '$1w$10$1KTze.DQ8FnS86EhYI9D2eX3vGbuCCyDjQaWtpiw/T8MwdO2QJ1rS';

export default {

    register(userData) {
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
import User from "../models/User.js"
import bcrypt from 'bcrypt';
import { genereteToken } from "../utils/authUtils.js";

export default {

    async register(userData) {
        // *Check if password match rePassword - Error handled in User Model with virtual Property!!!
        // if (userData.password !== userData.rePass) {
        //     throw new Error ('Password don\'t match!');
        // }

        if (!userData.email) {
            throw new Error('Email is required!');
        }

        // Check if email exist
        const user = await User.findOne({ email: userData.email }).select({ _id: true });
        if (user) {
            throw new Error('Email already exist!');
        }

        if (!userData.password) {
            throw new Error('Password is required!');
        }

        const createdUser = await User.create(userData);

        const token = genereteToken(createdUser);

        return token;
    },

    async login(email, password) {
        if (!email) {
            throw new Error('Email is required!');
        }

        // Check if user exist
        const user = await User.findOne({ email });
        if (!user) {
            throw new Error('Invalid email or password!');
        }

        // Check if password is correct
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
            throw new Error('Invalid email or password!');
        }

        // Generate token
        const token = genereteToken(user);

        return token;
    }

}
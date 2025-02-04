import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchrema = new Schema({
    'email': {
        type: String,
        required: [true, 'Email is required!'],
        unique: true,
        lowercase: true, // Sanitizer
        match: [/[\w]+\@[a-zA-Z]+.[a-zA-Z]+$/, 'Invalid email'],
        minLength: [10, 'Email should be at least 10 characters long!'],
    },
    'password': {
        type: String,
        required: [true, 'Password is required!'],
        match: [/^\w+$/, 'Password should consist English letters and digits only!'],
        minLength: [6, 'Password should be at least 6 characters long'],
        trim: true // Sanitizer
    },
});

//* Virtual property
userSchrema.virtual('rePassword')
    .set(function(value) {
        if (value !== this.password) {
            throw new Error('Password don\'t match!');
        }
    });

userSchrema.pre('save', async function () {
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchrema);

export default User;
import { Schema, model } from "mongoose";
import bcrypt from 'bcrypt';

const userSchrema = new Schema({
    'email': String,
    'password': String,
});

userSchrema.pre('save', async function () {
    //TODO: Fix update user bug
    this.password = await bcrypt.hash(this.password, 10);
});

const User = model('User', userSchrema);

export default User;
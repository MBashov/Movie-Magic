import { Schema, model } from "mongoose";

const userSchrema = new Schema({
    'email': String,
    'password': String,
});

const User = model('User', userSchrema);

export default User;
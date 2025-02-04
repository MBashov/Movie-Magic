import { Schema, model } from "mongoose";

// Create Schema
const CastSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required!'],
        minLength: [2, 'Name should be at least 2 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Name should be alphanumeric, digits and whitespaces only!'],
    },
    age: {
        type: Number,
        required: [true, 'Age is required!'],
        min: 0,
        max: 120
    },
    born: {
        type: String,
        required: [true, 'Born place is required!'],
        minLength: [2, 'Born place should be at least 2 characters long!'],
        match: [/^[a-zA-Z0-9\s,]+$/, 'Born place should be alphanumeric, digits and whitespaces only!'],
    },
    imageUrl: {
        type: String,
        match: [/^https?:\/\//, 'Image url should starts with http://... or https://...'],
    },
});

// Create Model
const Cast = model('Cast', CastSchema);

// Export model
export default Cast;
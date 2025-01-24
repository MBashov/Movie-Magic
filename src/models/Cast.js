import { Schema, model } from "mongoose";

// Create Schema
const CastSchema = new Schema({
    name: String,
    age: Number,
    born: String,
    imageUrl: String,
});

// Create Model
const Cast = model('Cast', CastSchema);

// Export model
export default Cast;
import { Schema, model, Types } from 'mongoose';

// Create Schema
const movieSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required!'],
        minLength: [2, 'Title should be at least 2 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Title should be alphanumeric, digits and whitespaces only!'],
    },
    category: String,
    genre: {
        type: String,
        required: [true, 'Genre is required!'],
        minLength: [2, 'Genre should be at least 2 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Genre should be alphanumeric, digits and whitespaces only!'],
    },
    director: {
        type: String,
        required: [true, 'Director is required!'],
        minLength: [2, 'Director should be at least 2 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Director should be alphanumeric, digits and whitespaces only!'],
    },
    year: {
        type: Number,
        required: [true, 'Year is required!'],
        min: 1900,
        max: 2028
    },
    imageUrl: {
        type: String,
        match: /^https?:\/\//
    },
    rating: {
        type: Number,
        required: [true, 'Rating is required!'],
        min: 0,
        max: 10
    },
    description: {
        type: String,
        required: [true, 'Description is required!'],
        minLength: [20, 'Description should be at least 20 characters long!'],
        match: [/^[a-zA-Z0-9\s]+$/, 'Description should be alphanumeric, digits and whitespaces only!']
    },
    casts: [{
        type: Types.ObjectId,
        ref: 'Cast'
    }],
    creator: {
        type: Types.ObjectId,
        ref: 'User',
    }
});

// Create model
const Movie = model('Movie', movieSchema);

// Export model
export default Movie;
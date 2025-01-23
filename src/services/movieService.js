import { v4 as uuid } from 'uuid';
import movies from "../movies.js";
import Movie from '../models/Movie.js';

export default {

    getAll(filter = {}) {
        let result = Movie.find({});

        // if (filter.search) {
        //     result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        // }

        // if (filter.genre) {
        //     result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
        // }

        // if (filter.year) {
        //     result = result.filter(movie => movie.year === filter.year);
        // }

        return result;
    },

    getOne(movieId) {
        const movie = Movie.findById(movieId);

        return movie;
    },

    create(movieData) {
        const id = uuid();

        movies.push({
            id,
            ...movieData,
            rating: Number(movieData.rating),
        });

        return id;
    }
} 
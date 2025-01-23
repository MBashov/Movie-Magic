import { v4 as uuid } from 'uuid';
import movies from "../movies.js";
import Movie from '../models/Movie.js';

export default {

    getAll(filter = {}) {
        let result = Movie.find({});

        if (filter.search) {
            result = result.find({ title: filter.search });
        }

        if (filter.genre) {
            result = result.find({ genre: filter.genre });
        }

        if (filter.year) {
            result = result.find({ year: Number(filter.year) });
        }

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
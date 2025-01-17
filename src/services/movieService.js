import { v4 as uuid } from 'uuid';
import movies from "../movies.js";

export default {

    getAll(filter = {}) {
        let result = movies;

        if (filter.search) {
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }

        if (filter.genre) {
            result = result.filter(movie => movie.genre.toLowerCase() === filter.genre.toLowerCase());
        }

        if (filter.year) {
            result = result.filter(movie => movie.year === filter.year);
        }

        return result;
    },

    findOne(movieId) {
        //TODO : If movie is missing?
        const movie = movies.find(movie => movie.id === movieId);

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
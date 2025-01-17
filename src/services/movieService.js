import { v4 as uuid } from 'uuid';
import movies from "../movies.js";

export default {

    getAll(filter = {}) {
        let result = movies;

        if (filter.search) {
            result = result.filter(movie => movie.title.toLowerCase().includes(filter.search.toLowerCase()));
        }
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
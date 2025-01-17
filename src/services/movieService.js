import { v4 as uuid } from 'uuid';
import movies from "../movies.js";

export default {

    getAll() {
        return movies;
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
        });

        return id;
    }
} 
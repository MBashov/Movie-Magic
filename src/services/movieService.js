import movies from "../movies.js";

export default {
    findOne(movieId) {
        //TODO : If movie is missing?
        const movie = movies.find(movie => movie.id === movieId);

        return movie;
    }
} 
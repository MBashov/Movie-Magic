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

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
        })

        return result;
    },

    async attachCast(castId, movieId) {
        const movie = await Movie.findById(movieId);
        
        movie.casts.push(castId);
        await movie.save();

        return movie;
    }
} 
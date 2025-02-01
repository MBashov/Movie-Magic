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

    create(movieData, creatorId) {

        const result = Movie.create({
            ...movieData,
            rating: Number(movieData.rating),
            year: Number(movieData.year),
            creator: creatorId,
        });

        return result;
    },

    attachCast(castId, movieId) {
        //* Type 1
        // const movie = await Movie.findById(movieId);

        // movie.casts.push(castId);
        // await movie.save();

        // return movie;

        // *Type 2
        return Movie.findByIdAndUpdate(movieId, { $push: { casts: castId } });
    },

    delete(movieId) {
        return Movie.findByIdAndDelete(movieId);
    },

    update(movieId, movieData) {
        return Movie.findByIdAndUpdate(movieId, movieData);
    }

} 
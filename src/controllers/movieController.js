import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import getCategoriesViewData from "../helpers/movieCategoriesHelper.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";


const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;

    try {
        const movies = await movieService.getAll(filter);
        res.render('search', { movies, filter });
    } catch (error) {
        res.render('search', { error: getErrorMessage(error) });
    }

});

movieController.get('/create', isAuth, (req, res) => {
    res.render('movie/create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMovie = req.body;
    const userId = req.user?.id;

    try {
        await movieService.create(newMovie, userId);
        res.redirect('/');
    } catch (error) {
        const categories = getCategoriesViewData(newMovie.category);
        res.render('movie/create', { newMovie, categories, error: getErrorMessage(error) });
    }

});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getOne(movieId).populate('casts');

        const isCreator = movie.creator?.equals(req.user?.id);

        res.render('movie/details', { movie, isCreator });

    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
});

movieController.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getOne(movieId);

        const isCreator = movie.creator?.equals(req.user?.id);

        if (!isCreator) {
            return res.render('404', { error: 'You are not the movie owner!' });
        }

        const casts = await castService.getAll({ exclude: [movie.casts] });
        res.render('movie/attachCast', { movie, casts });

    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }

});

movieController.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getOne(movieId);

        const isCreator = movie.creator?.equals(req.user?.id);

        if (!isCreator) {
            return res.render('404', { error: 'You are not the movie owner!' });
        }

        await movieService.attachCast(castId, movieId);
        res.redirect(`/movies/${movieId}/details`);

    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }


});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    try {
        const movie = await movieService.getOne(movieId);

        if (!movie.creator.equals(req.user?.id)) {
            return res.render('404', { error: 'You are not the movie owner!' });
        }

        await movieService.delete(movieId);

        res.redirect('/');

    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }
});

movieController.get('/:movieid/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieid;

    try {
        const movie = await movieService.getOne(movieId);
        const isCreator = movie.creator?.equals(req.user?.id);

        if (!isCreator) {
            return res.render('404', { error: 'You are not the movie owner!' });
        }

        const categories = getCategoriesViewData(movie.category);

        res.render('movie/edit', { movie, categories });

    } catch (error) {
        res.render('404', { error: getErrorMessage(error) });
    }

});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    try {
        const movie = await movieService.getOne(movieId);
        const isCreator = movie.creator?.equals(req.user?.id);

        if (!isCreator) {
            return res.render('404', { error: 'You are not the movie owner!' });
        }
        await movieService.update(movieId, movieData);

        res.redirect(`/movies/${movieId}/details`);

    } catch (error) {

        const categories = getCategoriesViewData(movieData.category);
        res.render('movie/edit', { movie: movieData, categories, error: getErrorMessage(error) });
    }
});

export default movieController; 
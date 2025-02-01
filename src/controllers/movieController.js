import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";
import getCategoriesViewData from "../helpers/movieCategoriesHelper.js";
import { isAuth } from "../middlewares/authMiddleware.js";


const movieController = Router();

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.get('/create', isAuth, (req, res) => {
    res.render('create');
});

movieController.post('/create', isAuth, async (req, res) => {
    const newMmovie = req.body;
    const userId = req.user?.id;

    await movieService.create(newMmovie, userId);
    res.redirect('/');

    res.end();
});

movieController.get('/:movieId/details', async (req, res) => {

    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId).populate('casts');

    // const isCreator = movie.creator && movie.creator.toString() === req.user?.id;
    const isCreator = movie.creator?.equals(req.user?.id);

    res.render('movie/details', { movie, isCreator });
});

movieController.get('/:movieId/attach-cast', isAuth, async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({ exclude: [movie.casts] });

    res.render('movie/attachCast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', isAuth, async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    await movieService.attachCast(castId, movieId);

    res.redirect(`/movies/${movieId}/details`);
    res.end();
});

movieController.get('/:movieId/delete', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);

    if (!movie.creator.equals(req.user?.id)) {
        return res.redirect('/404');
    }

    await movieService.delete(movieId);

    res.redirect('/');
});

movieController.get('/:movieid/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieid;
    const movie = await movieService.getOne(movieId);

    const categories = getCategoriesViewData(movie.category);
    res.render('movie/edit', { movie, categories });
});

movieController.post('/:movieId/edit', isAuth, async (req, res) => {
    const movieId = req.params.movieId;
    const movieData = req.body;

    //TODO: Check if creeator

    await movieService.update(movieId, movieData);

    res.redirect(`/movies/${movieId}/details`);
});

export default movieController; 
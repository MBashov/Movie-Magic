import { Router } from "express";
import movieService from "../services/movieService.js";
import castService from "../services/castService.js";


const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.get('/search', async (req, res) => {
    const filter = req.query;
    const movies = await movieService.getAll(filter);

    res.render('search', { movies, filter });
});

movieController.post('/create', (req, res) => {
    const newMmovie = req.body;
    const userId = req.user.id;

    movieService.create(newMmovie, userId);
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

movieController.get('/:movieId/attach-cast', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);
    const casts = await castService.getAll({ exclude: [movie.casts] });

    res.render('movie/attachCast', { movie, casts });
});

movieController.post('/:movieId/attach-cast', async (req, res) => {
    const castId = req.body.cast;
    const movieId = req.params.movieId;

    movieService.attachCast(castId, movieId);

    res.redirect(`/movies/${movieId}/details`);
    res.end();
});

movieController.get('/:movieId/delete', async (req, res) => {
    const movieId = req.params.movieId;
    const movie = await movieService.getOne(movieId);
    
    if (!movie.creator.equals(req.user?.id)) {
        return res.redirect('/404');
    }

    await movieService.delete(movieId);

    res.redirect('/');
}); 

movieController.get('/:movieid/edit', (req, res) => {
    res.render('movie/edit');
});

export default movieController; 
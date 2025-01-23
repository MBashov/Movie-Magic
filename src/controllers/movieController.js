import { Router } from "express";
import movieService from "../services/movieService.js";


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

    movieService.create(newMmovie);
    res.redirect('/');

    res.end();
});

movieController.get('/:movieId/details', async (req, res) => {
    const movieId = req.params.movieId;

    const movie = await movieService.getOne(movieId);

    res.render('details', { movie });
});

export default movieController; 
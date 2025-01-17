import { Router } from "express";
import movieService from "../services/movieService.js";


const movieController = Router();

movieController.get('/create', (req, res) => {
    res.render('create');
});

movieController.post('/create', (req, res) => {
    const newMmovie = req.body;

    movieService.create(newMmovie);
    res.redirect('/');
     
    res.end();
});

movieController.get('/:movieId/details', (req, res) => {
    const movieId = req.params.movieId;

    const movie = movieService.findOne(movieId);

    res.render('details', { movie });
});

export default movieController; 
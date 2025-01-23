import { Router } from "express";
import movieService from "../services/movieService.js";

const router = Router();

router.get('/', async (req, res) => {
    //* Another solution to convert documents to plain object is to use .lean(); Now we achieve that with 
    //* using runtimeOption "allowProtoPropertiesByDefault: true" in handlebars in index.js file
    const movies = await movieService.getAll();

    res.render('home', { movies });
});

router.get('/about', (req, res) => {
    res.render('about');
});

export default router; 
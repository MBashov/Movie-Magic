import { Router } from "express";
import castService from "../services/castService.js";

const castController = Router();

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', (req, res) => {
    const newCast = req.body;

    castService.create(newCast);

    res.redirect('/');
    res.end();
});

export default castController;
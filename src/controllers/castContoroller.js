import { Router } from "express";
import castService from "../services/castService.js";
import { isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";

const castController = Router();
castController.use(isAuth);

castController.get('/create', (req, res) => {
    res.render('cast/create');
});

castController.post('/create', async (req, res) => {
    const newCast = req.body;

    try {
        await castService.create(newCast);
        res.redirect('/');
    } catch (error) {
        return res.render('cast/create', { error: getErrorMessage(error), newCast });
    }


});

export default castController;
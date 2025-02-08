import { Router } from "express";
import authService from "../services/authService.js";
import { auth, isAuth } from "../middlewares/authMiddleware.js";
import { getErrorMessage } from "../utils/errorUtils.js";
import { AUTH_COOKIE_NAME } from "../config.js";

const authController = Router();

authController.get('/register', auth, (req, res) => {
    res.render('auth/register');
});

authController.post('/register',  auth, async (req, res) => {
    const userData = req.body;

    try {
        const token = await authService.register(userData);
        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        res.redirect('/');
    } catch (err) {
        res.render('auth/register', { email: userData.email, error: getErrorMessage(err) });
    }

});

authController.get('/login', auth, (req, res) => {
    res.render('auth/login');
});

authController.post('/login',  auth, async (req, res) => {

    const { email, password } = req.body;

    try {
        const token = await authService.login(email, password);

        res.cookie(AUTH_COOKIE_NAME, token, { httpOnly: true });

        res.redirect('/');

    } catch (error) {
        return res.render('auth/login', { email, error: getErrorMessage(error) });
    }

});

authController.get('/logout', isAuth, (req, res) => {
    res.clearCookie(AUTH_COOKIE_NAME);
    res.redirect('/');
});

export default authController;
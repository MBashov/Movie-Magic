import jwt from 'jsonwebtoken';
import { AUTH_COOKIE_NAME, JWT_SECRET } from '../config.js';

export const authMiddleware = (req, res, next) => {
    // Get token
    const token = req.cookies[AUTH_COOKIE_NAME];

    if (!token) {
        return next();
    }
    
    try {
        // Validate token   
        const decodedToken = jwt.verify(token, JWT_SECRET);  

        // Attach decoded token to requset
        req.user = decodedToken;
        res.locals.user = decodedToken;
        
        next(); 
    } catch (err) {
        res.clearCookie(AUTH_COOKIE_NAME);
        res.redirect('/auth/login');
    }
}

export const isAuth = (req, res, next) => {
    
    if(!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}

export const auth = (req, res, next) => {
    
    if (req.user) {
        return res.redirect('/404');
    }

    next();
}
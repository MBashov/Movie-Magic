import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../config.js';

export const authMiddleware = (req, res, next) => {
    // Get token
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }
    
    try {
        // Validate token   
        const decodedToken = jwt.verify(token, JWT_SECRET);  

        // Attached decoded token to requset
        req.user = decodedToken;
        res.locals.user = decodedToken;
        
        next(); 
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}

export const isAuth = (req, res, next) => {
    
    if(!req.user) {
        return res.redirect('/auth/login');
    }

    next();
}
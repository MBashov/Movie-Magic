import jwt from 'jsonwebtoken';

const SECRET = '$1w$10$1KTze.DQ8FnS86EhYI9D2eX3vGbuCCyDjQaWtpiw/T8MwdO2QJ1rS';

export const authMiddleware = (req, res, next) => {

    // Get token
    const token = req.cookies['auth'];

    if (!token) {
        return next();
    }
    
    try {
        // Validate token   
        const decodedToken = jwt.verify(token, SECRET);  

        // Attached decoded token to requset
        req.user = decodedToken;

        next(); 
    } catch (err) {
        res.clearCookie('auth');
        res.redirect('/auth/login');
    }
}
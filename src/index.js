import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';

import routes from './routes.js'
import showRatingHelper from './helpers/ratingHelpers.js';

const app = express();

// db configuration
try {
    await mongoose.connect('mongodb://localhost:27017/magic-movies-jan-2025');
    console.log('DB Conected Successfuly!');
} catch (error) {
    console.log('Cannot conect to DB!');
    console.error(error.message);
}

// handlebars configuration
app.engine('hbs', handlebars.engine({
    extname: 'hbs',
    runtimeOptions: {
        allowProtoPropertiesByDefault: true
    },
    helpers: {
        showRating: showRatingHelper
    }
}));
app.set('view engine', 'hbs');
app.set('views', './src/views')

// express configuration
app.use('/static', express.static('src/public'));
app.use(express.urlencoded({ extended: false })); // Learn express to parse formdata    
app.use(cookieParser());

// setup routes
app.use(routes);

// start server
app.listen(5000, () => console.log('Server is listening on http://localhost:5000...'));
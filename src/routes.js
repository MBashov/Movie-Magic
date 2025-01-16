import { Router } from 'express';
import homeControler from './controllers/homeController.js';
import movieController from './controllers/movieController.js';

const routes = Router();
routes.use(homeControler);
routes.use(movieController);

routes.get('*', (req, res) => {
    res.render('404');
});


export default routes;
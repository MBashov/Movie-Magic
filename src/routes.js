import { Router } from 'express';
import homeControler from './controllers/homeController.js';

const routes = Router();
routes.use(homeControler);

routes.get('*', (req, res) => {
    res.render('404');
});


export default routes;
import { Router } from 'express';
import homeControler from './controllers/homeController.js';
import movieController from './controllers/movieController.js';
import castController from './controllers/castContoroller.js';

const routes = Router();

routes.use(homeControler);
routes.use('/movies', movieController);
routes.use('/casts', castController)

routes.get('*', (req, res) => {
    res.render('404');
});


export default routes;
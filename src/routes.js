import { Router } from 'express';
import homeControler from './controllers/homeController.js';

const router = Router();
router.use(homeControler);

router.get('*', (req, res) => {
    res.render('404');
});


export default router;
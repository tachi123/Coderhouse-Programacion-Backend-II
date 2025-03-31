//Por defecto, en view.router.js voy a almacenar los endpoint que renderizan
import {Router} from 'express';
import { isLoggedOut, isLoggedIn } from '../middlewares/auth.js';

const router = Router();

//Renderizar la vista de LOGIN
router.get('/login', isLoggedOut, (req, res)=> {
    res.render('login')
})


//Renderizar la vista de REGISTRACIÓN
router.get('/register', isLoggedOut, (req, res)=> {
    res.render('register')
})

//Renderizar la vista de RESTAURACIÓN
router.get('/restore-password', isLoggedOut, (req, res)=> {
    res.render('restore')
})

//Renderizar la vista de PERFIL
router.get('/perfil', isLoggedIn, (req, res)=> {
    res.render('perfil', {
        user: {
            first_name: req.session.user.first_name,
            last_name: req.session.user.last_name,
            email: req.session.user.email,
            age: req.session.user.age,
        }
    })
})

export default router;
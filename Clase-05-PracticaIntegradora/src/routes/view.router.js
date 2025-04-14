import { Router } from 'express';

const router = Router();

//Endpoint para REGISTER
router.get('/register', (req, res) => res.render('register'));

//Endpoint para LOGIN
router.get('/login', (req, res) => res.render('login'));

//Endpoint para CURRENT  (usuario actual)
router.get('/current', (req, res) => res.render('current'));

export default router;
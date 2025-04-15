import jwt from 'jsonwebtoken';
import config from '../config/config.js';

const PRIVATE_KEY = config.JWT_PRIVATE_KEY;

export const isLoggedIn = (req, res, next) => {
    const authHeader = req.cookies.currentUser;
    if(!authHeader) 
        res.render('login'); //Redirijo al login si no hay sesión

    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra 'Bearer'
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        //jwt verifica el token existente y corrobora si es un token válido, alterado, expirado, etc.
        if(error) res.render('login'); //Redirijo al login si no hay sesión
        //Si todo está en orden, se descrifra correctamente el token y se envía al usuario
        req.user = credentials;
        next();
    })
}

export const isLoggedOut = (req, res, next) => {
    const authHeader = req.cookies.currentUser;
    if(!authHeader) {
        next();
    }else{
        res.render('current');
    }
}
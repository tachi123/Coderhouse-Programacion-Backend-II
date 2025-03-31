import express from 'express';

export const isLoggedIn = (req, res, next) => {
    if(req.session.user){
        next(); //Permitir el acceso si hay sesión
    } else {
        res.redirect('/login'); //Redirijo al login si no hay sesión
    }
}

export const isLoggedOut = (req, res, next) => {
    if(req.session.user){
        res.redirect('/perfil'); //Redirijo al perfil si estoy logueado
    } else {
        next(); //Permitir el acceso si no hay sesión
    }
}
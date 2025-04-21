import express from 'express';
import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';
import { __dirname } from './utils.js';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/session.router.js';

const app = express();
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(__dirname +'/public'));

initializePassport();
app.use(passport.initialize());

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuro cookie parser y passport
app.use(cookieParser());

app.use('/', viewsRouter);
app.use('/session',sessionRouter);

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'))


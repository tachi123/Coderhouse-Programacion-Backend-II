import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import mongoose, { mongo } from 'mongoose';
import session from 'express-session';

import passport from 'passport';
import initializePassport from './config/passport.config.js';

import viewsRouter from './routes/views.router.js';
import sessionRouter from './routes/session.router.js';

const PORT = 3000;
const URLBD = 'mongodb://localhost:27017/Coderhouse';

const app = express();

//Configuramos conexion a la BD
const connection = mongoose.connect(URLBD, { useNewUrlParser: true, useUnifiedTopology: true});

//Configuro middleware express-session
app.use(session({
    secret: 'coderSecret',
    resave: false,
    saveUninitialized: false
}))

//Configuramos el motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Configuramos passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session({ secret: "CoderSecret"}))

app.use('/', viewsRouter);
app.use('/api/sessions', sessionRouter);

const server = app.listen(PORT, ()=> console.log(`Listening on PORT ${PORT}`));
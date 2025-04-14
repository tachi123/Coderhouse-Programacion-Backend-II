import express from 'express';
import config from './config/config.js';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';

//Importamos los routers
import userRouter from './routes/user.router.js';
import viewsRouter from './routes/view.router.js';

const PORT = config.PORT;
const FIRMA_COOKIE = config.FIRMA_COOKIE;
const URL_MONGO = config.URL_MONGO;

//Configuramos nuestra aplicación
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(FIRMA_COOKIE)); //Agregamos el middleware para trabajar con cookies y además la firma de cookies
app.use(express.static( __dirname + '/public'));

//Rutas base para vistas y API
app.use('/user', viewsRouter);
app.use('/api/user', userRouter);

//Configuración del motor de plantillas
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine','handlebars');

//Configuramos y conectamos a la base de datos
mongoose.connect(URL_MONGO)
    .then(
        () =>
            //Iniciar servidor
            app.listen(PORT, () => console.log(`Listening ON PORT: ${PORT}`))
    )
    .catch((error) => console.error(`Error en conexión: ${error}`))

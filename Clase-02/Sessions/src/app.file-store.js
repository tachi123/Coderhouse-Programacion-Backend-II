import express from 'express';
import session from 'express-session';
import FileStore from 'session-file-store';

const port = 3000;
const app = express();

//Nota cómo conecatamos sessions con lo que será nuestro FileStore.
const fileStorage = FileStore(session);

app.use(session({
    //path: ruta donde vivirá la carpeta para almacenar las sesiones
    //ttl : Time To Live. Vida de la sesión (en segundos)
    //retries: Tiempo de veces que el servidor tratará de leer el archivo
    store: new fileStorage({path: './sessions', ttl: 60, retries: 0}),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
}));

//Middleware que verifica y elimina los archivos de las sesiones expiradas
app.use( (req, res, next) => {
    req.session(regenerate( err => {//Regenera la sesión, eliminando la antigua
        if(err) return next(err);
        next();
    }))
})

//Definimos una ruta de ejemplo para el endpoint de login
app.get('/login', (req, res ) => {
    const name = req.query.name ?? "Nahuel";
    console.log(name);
    req.session.name = name;
    if(req.session.loggedIn){
        res.send(`Ya estás logueado ${req.session.name}.`);
    }else{
        req.session.loggedIn = true;
        res.send('¡Inicio de sesión exitoso!');
    }
})

const server = app.listen(port, ()=> console.log(`Listening on PORT: ${port}`));

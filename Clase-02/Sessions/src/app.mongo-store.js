import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';

const mongoURL = 'mongodb://localhost:27017/CoderHouse70310'; //Connection string + db
const port = 3000;
const app = express();

app.use(session({
    store: MongoStore.create({
        mongoUrl: mongoURL,
        //mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true},
        ttl: 15
    }),
    secret: 'secretCoder',
    resave: false,
    saveUninitialized: false
}));


//Definimos una ruta de ejemplo para el endpoint de login
app.get('/login', (req, res ) => {
    const name = req.query.name ?? "Nahuel";
    req.session.name = name;
    if(req.session.loggedIn){
        res.send(`Ya estás logueado ${req.session.name}.`);
    }else{
        req.session.loggedIn = true;
        res.send('¡Inicio de sesión exitoso!');
    }
})

const server = app.listen(port, ()=> console.log(`Listening on PORT: ${port}`));
import express from 'express';
import handlebars from 'express-handlebars';
import { __dirname } from './utils.js';
import mongoose from 'mongoose';
import passport from 'passport';
import initializePassport from './config/passport.config.js';

//Importo para poder trabajar con sesiones y almacenarlas en MongoDB
import session from 'express-session';
import MongoStore from 'connect-mongo';

//Importo los routers
import viewsRouter from './routes/view.router.js';
import sessionRouter from './routes/session.router.js';

const app = express();

//Configuro los middleware para poder trabajar con objetos o json desde formularios
app.use(express.json());
app.use(express.urlencoded({extended: true}));

//Configuramos y conectamos a la base de datos
const mongoURL = 'mongodb://localhost:27017/CoderHouse70310';
mongoose.connect(mongoURL)
    .then( () => console.log("Conexión a base de datos exitosa"))
    .catch( (error) => console.error('Error de conexión: ', error));

//Configuramos passport
initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(session({
    store: MongoStore.create({ mongoUrl: mongoURL}),
    secret: 'asd3nc3okasod',
    resave: false,
    saveUninitialized: false
}));

//Configuración de nuestro motor de plantilla
app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

//Implementación de los routers
app.use('/', viewsRouter);
app.use('/api', sessionRouter);

const server = app.listen(8080, ()=> console.log("Listening on PORT 8080"));

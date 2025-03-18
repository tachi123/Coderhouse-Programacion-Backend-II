import express from 'express';
import userRouter from './routes/user.router.js';
import cookieParser from 'cookie-parser';
import mongoose from 'mongoose';
import cors from 'cors';

//Iniciamos la conexión con MongoDB
mongoose.connect('mongodb://localhost:27017/class-zero');

const app = express();

//Configuro CORS - Opción 1: Permitir todos los origenes (NO ES RECOMENDADO)
//app.use(cors()); //Es un middleware para habilitar quien me puede consumir o consultar a mis endpoint

//Opción 2: Permitir orígenes específicos (RECOMENDADO)
const allowedOrigins = ['http://localhost','http://tudominio.com', 'http://URLDELFRONTEND', 'http://127.0.0.1:5500'];
app.use(cors({
    origin: function(origin, callback){
        if(!origin || allowedOrigins.includes(origin)){
            //Acepta si no hay origen (ej. Postman) o si está en la lista blanca
            callback(null,true)
        }else{
            callback(new Error('Not allowed by CORS'))
        }
    }
}))

//Middleware de aplicación incorporados por express
app.use(express.json()); //Formate los cuerpos json de peticiones entrantes (req.body)
app.use(express.urlencoded({extended: true})); //Formate query params de URLs para peticiones entrantes.

//Middleware para configurar la carpeta donde alejamos los recursos estáticos
app.use(express.static('/public'));

//Middleware para poder trabajar con cookies
app.use(cookieParser());

app.use('/api/user', userRouter);

app.listen(8080, ()=> {
    console.log(`Start server in port 8080`);
})
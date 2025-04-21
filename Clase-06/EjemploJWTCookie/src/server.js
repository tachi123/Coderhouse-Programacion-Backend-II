import express from 'express';
import jwt from 'jsonwebtoken';

import cookieParser from 'cookie-parser';
import { __dirname } from './utils.js';

const app = express();
// Servir archivos estáticos desde la carpeta 'public'
app.use(express.static(__dirname +'/public'));

//configurar para trabajar con json 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//Configuro cookie parser y passport
app.use(cookieParser());

app.post('/login', (req, res) => {
    const {email, password} = req.body;

    //En una plicación real, se usa la base de datos o un servicio de autenticación de terceros
    if(email === 'coder@coder.com' && password === 'coderpass'){
        //Firmar el token y es importante cambiar la clave por una clave segura
        const token = jwt.sign({email}, 'secretKey', {expiresIn: '1h'});

        //Sin HTTP only para la primera parte del ejercicio
        res.cookie('token',token, {httpOnly: true, maxAge: 3600000}).send({message: 'Logged in!'});

    }else{
        res.status(401).send({message: 'Credenciales inválidas'});
    }
})

app.listen(3000, () => console.log('Servidor escuchando en el puerto 3000'))


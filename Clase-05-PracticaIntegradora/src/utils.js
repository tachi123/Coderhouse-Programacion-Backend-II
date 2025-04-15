//Creo funciones que reutilizó o sos estandares en mis proyectos
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import config from './config/config.js';

const __filename = fileURLToPath(import.meta.url);

/**
 * Una private key sirve para utilizarse al momento de hacer el cifrado del token
 */
const PRIVATE_KEY = config.JWT_PRIVATE_KEY;
const EXPIRES_TIME_TOKEN = config.JWT_EXPIRES_TIME_TOKEN;

/**
 * 
 * generateToken: al utilizar jwt.sign:
 * El rpimer argumento es un objeto con la información
 * El segundo argumento es la llave privada con lac ual se realizará el cifrado
 * El tercer argumento es el tiempo de expiración del token
 */
export const generateToken = (user) => {
    const token = jwt.sign(user, PRIVATE_KEY, {expiresIn: EXPIRES_TIME_TOKEN});
    return token;
}

export const authToken = (req, res, next) => {
    //Recordamos que el token viene desde los headers de autorización
    const authHeader = req.headers.authorization;
    if(!authHeader) return res.status(401).send({//Si no hay headers, es porque no hay token y por lo tanto no esta autenticado
        error: "Not authenticated"
    });
    const token = authHeader.split(' ')[1]; //Se hace el split para retirar la palabra 'Bearer'
    jwt.verify(token, PRIVATE_KEY, (error, credentials) => {
        //jwt verifica el token existente y corrobora si es un token válido, alterado, expirado, etc.
        if(error) return res.status(403).send( {error: "Not authorized"});
        //Si todo está en orden, se descrifra correctamente el token y se envía al usuario
        req.user = credentials;
        next();
    })
}

/** 
 * createHash es una función que recibe un password como argumento 
 * y genera un hash de ese password usando el algoritmo bcrypt
 * - Genera un salt (una cadena aleatoria de 10 caracteres)
 * - Genera el hash del password usando el salt
 * - Devuelve el hash del password*/
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

// Crea una constante llamada isValidPassword
// La constante es una función que recibe un objeto user y un password como argumentos
// Compara el password con el password hasheado almacenado en el objeto user
// Devuelve true si el password coincide con el password hasheado, false en caso contrario
export const isValidPassword = (user, password) => bcrypt.compareSync(password, user.password);

export const __dirname = dirname(__filename);
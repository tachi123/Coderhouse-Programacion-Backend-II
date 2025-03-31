//Creo funciones que reutilizó o sos estandares en mis proyectos
import {fileURLToPath} from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);

/** 
 * createHash es una función que recibe un password como argumento 
 * y genera un hash de ese password usando el algoritmo bcrypt /*

/ * Creo una función flecha en la constante createHash
Es una función que recibe un PASSWORD como argumento y:
- Genera un salt (una cadena aleatoria de 10 caracteres)
- Genera el hash del password usando el salt
- Devuelve el hash del password
*/
export const createHash = password => bcrypt.hashSync(password, bcrypt.genSaltSync(10));

/**
 * isValidPassword es una función que compara un password dado con un passwordhasheado (almacenado en un objeto user)
 */
/**
 * Creamos una función que recibe un objeto user y un password como argumentos
 * Compara el password ingresado con el password hasheado almacenado en el objeto user
 */
export const isValidPassword = (user, passwordSinHashear) => bcrypt.compareSync(passwordSinHashear, user.password);

export const __dirname = dirname(__filename);
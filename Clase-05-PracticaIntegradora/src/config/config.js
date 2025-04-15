/**
 * Archivo donde cargo las variables de entorno y las devuelvo en un objeto
 * 
 */
import dotenv from 'dotenv';

/**
 * Dependiendo donde esten posicionados a la hora de ejecutar node  / nodemon el archivo .env debería estar en ese mismo nivel
 * Si no es necesario definir de manera explítica el path del archivo .env
 */
dotenv.config({
    path: ".env" //ejecuto desde la raíz del proyecto con el comando nodemon ./src/app.js
});

export default {
    PORT: process.env.PORT || 3000,
    URL_MONGO: process.env.URL_MONGO,
    FIRMA_COOKIE : process.env.FIRMA_COOKIE || 'ClaveSecreta',
    JWT_PRIVATE_KEY : process.env.JWT_PRIVATE_KEY || 'ClaveSecreta',
    JWT_EXPIRES_TIME_TOKEN: process.env.JWT_EXPIRES_TIME_TOKEN || '24hs',
}

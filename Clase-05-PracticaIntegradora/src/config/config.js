/**
 * Archivo donde cargo las variables de entorno y las devuelvo en un objeto
 * 
 */
import dotenv from 'dotenv';

dotenv.config();

export default {
    PORT: process.env.PORT || 3000,
    URL_MONGO: process.env.URL_MONGO,
    FIRMA_COOKIE : process.env.FIRMA_COOKIE,
    PRIVATE_KEY : process.env.PRIVATE_KEY,
    EXPIRES_TIME_TOKEN: process.env.EXPIRES_TIME_TOKEN,
}

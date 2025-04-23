import dotenv from 'dotenv';
import { Command } from 'commander';



//Configurar para leer el argumento enviado desde la ejecución del script
const program = new Command();

program //option(EL COMANDO/FLAG, DESCRIPCION, VALOR POR DEFAULT)
    .option()
    .parse();

const environment = CARGAR EL ARGUMENTO DEL ENVIRONMENT;

/**Inicialización de las variables de entorno */
dotenv.config({
    path : environment === "PRODUCTION" ? './.env.production' : './.env.development'
});

export default {
    port : process.env.PORT || 8080,
    dbUrl : process.env.DATABASE_URL,
    dbPassword : process.env.DATABASE_PASSWORD,
    jwtKey: process.env.JWT_KEY
}
import dotenv from 'dotenv';
import { Command } from 'commander';

//Configurar para leer el argumento enviado desde la ejecución del script
const program = new Command();

program //option(EL COMANDO/FLAG, DESCRIPCION, VALOR POR DEFAULT)
    .requiredOption("--mode <mode>", "Modo de trabajo","Es necesario declarar el environment")
    .parse();

const environment = program.opts().mode; //dev prod test

/**Inicialización de las variables de entorno */
dotenv.config({
    //path : environment.toUpperCase() === "PRODUCTION" ? './.env.production' : './.env.development'
    path: `.env.${environment}`
});

if(process.env.PORT === undefined){
    console.error(`Error al cargar el archivo .env.${environment}`);
    process.exit(1); //Salir con código de error
}

export default {
    port : process.env.PORT || 8080,
    dbUrl : process.env.DATABASE_URL,
    dbPassword : process.env.DATABASE_PASSWORD,
    jwtKey: process.env.JWT_KEY
}
import express from 'express';
import config from './config/config.js';

const PORT = config.port;

const ERROR_FATAL_EXCEPTION = 1;
const ERROR_FILE_NOT_FOUND = 101;
const ERROR_DATABASE_CONNECTION = 100;
const ERROR_INVALID_PARAMETER = -4;

//Listeners
process.on('exit', (codeNumber) => {
    if(codeNumber === 0){
        console.log("Proceso finalizado correctamente");
    }else{
        console.log(`Proceso finalizado con código de error: ${codeNumber}`);
    }
    //Limpieza (cerrar conexiones, etc)
})

process.on('uncaughtException', exception => {
    console.log("Este código atrapa todas las excepciones no controladas");

    if(exception.message.startsWith('Error de conexión a la base de datos')){
        process.exit(ERROR_DATABASE_CONNECTION);
    }else if(exception.message.startsWith('Archivo no encontrado')){
        process.exit(ERROR_FILE_NOT_FOUND);
    }else{
        console.log(`¡Error no capturado: ${exception}`);
        process.exit(1);
    }
    //Logueamos el error, para intentar recuperar pacialmente la aplicación
    //Cerrar la aplicación
    //process.exit(1); //Salir con un código de error indicando fallo
})

process.on('message', message => {
    console.log("Este código se ejecutará cuando reciba un mensaje de otro proceso")
})

const app = express();

console.log(process.memoryUsage());

console.log(config);

app.listen(PORT, () => console.log(`Server listening on port ${PORT} with NODE version: ${process.version} and processId ${process.pid}`));

//consle.log("asdfasdf");

function listNumbers(...numbers){
    //Filtrar y quedarme con elementos no numéricos
    if(numbers.some(unNum => typeof unNum != 'number')){
        console.log('Invalid parameters: ', numbers.map( elem => typeof elem));
        process.exit(ERROR_INVALID_PARAMETER); //Uso un código de salida personalizado
    }
    console.log('Números válidos: ',numbers);
}

listNumbers(1,2,3,4,5); //Salida: [1,2,3,4,5] (Proceso finalizado correctamente)
listNumbers(1,2,'a',true,5); //Salida: invalidParameters (Proceso finalizado con código de error personalizado -4)
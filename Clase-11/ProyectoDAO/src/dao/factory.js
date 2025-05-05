/**
 * Implementamos el PATRON FACTORY
 * Me va a crear y devolver el DAO vinculado con el sistema de persistencia que proviene de la variable de entorno
 */
import config from '../config/config.js';
import mongoose from 'mongoose';

let persistence;

switch(config.PERSISTENCE){
    case 'CONTACTS_MEMORY':
        const { default: ContactsMemory } = await import('./memory/contact.memory.js');
        persistence = new ContactsMemory();
    break;
    case 'CONTACTS_MONGO':
        const connection = mongoose.connect(config.URL_MONGO);
        const { default: ContactsMongo } = await import('./mongo/contact.mongo.js');
        persistence = new ContactsMongo();
    break;
    //Otros para FILE, otros motores de base de datos, etc.
    default:
        throw new Error("Persistencia no soportada");
}

export default persistence;
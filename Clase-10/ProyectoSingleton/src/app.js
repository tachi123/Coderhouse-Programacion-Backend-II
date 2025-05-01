import MongoSingleton from "./config/mongoSingleton.js";

const mongoInstance = MongoSingleton.getInstance();

//Cuando intentamos conectarnos nuevamente a la base de datos
//No se va a conectar, si no que me va a devolver la conexión ya instanciada la primera vez que se ejecuto el getInstance()
const anotherMongoInstance = MongoSingleton.getInstance();
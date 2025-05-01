import mongoose from 'mongoose';

export default class MongoSingleton{

    static #instance;

    //En el método constructor creo la conexión
    constructor(){
        mongoose.connect("URL", {userNewUrlParser: true, useUnifiedTopology: true});
    }

    //Al momento de resolver este método, creo una instancia solo si es la primera vez que se ejecuta este método
    static getInstance(){
        if(this.#instance){
            console.log("Already connected");
            return this.#instance;
        }
        this.#instance = new MongoSingleton();
        console.log("connected");
        return this.#instance;
    }
}
import mongoose from 'mongoose'
import config from './config.js'


export default class MongoSingleton {
    static #instance

    constructor(){
        this.#connectMongoDB() 
    }

    static getIntance(){
        if (this.#instance) {
            console.log("ya se conecto a mogno"); 
        }else{
            this.#instance = new MongoSingleton 
        }

        return this.#instance
    }

    #connectMongoDB = async () =>{
        try {
            await mongoose.connect(config.MONGO_URL) /*me va a conectar con esta base de datos q sale de config */
            console.log("conectado a mongo");
        } catch (error) {
            console.error("no se pudo conectar a mongo");
            process.exit()
        }
    }


}
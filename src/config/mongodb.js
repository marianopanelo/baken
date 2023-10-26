import mongoose from 'mongoose'
import config from './config.js'
import CustomError from '../services/error/customError.js';
import EErrors from "../services/error/enumeracionDeError.js";

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
        
        if(config.MONGO_URL != "mongodb+srv://marianoapanelo:mariano5@cluster0.9gafxeg.mongodb.net/ecommers"){
            CustomError.createError({
                name: "error al conectar con mongo" , 
                message: "url ingresada esta mal",
                code: EErrors.DATABASE_ERROR
            })
        }
            await mongoose.connect(config.MONGO_URL) 
            console.log("conectado a mongo");
 
    }


}
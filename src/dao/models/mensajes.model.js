import mongoose from "mongoose"

const mensajes = "messages"



const mensajesEsquema = new mongoose.Schema({
    mensaje : String 
})



export const mensajesModelo = mongoose.model(mensajes , mensajesEsquema)

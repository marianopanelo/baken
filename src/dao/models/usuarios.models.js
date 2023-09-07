import mongoose from 'mongoose';

const usuarios = 'usuarios';

const usuariosEsquema = new mongoose.Schema({
    nombre: String,
    apellido: String,
    email: {
        type: String,
        unique: true
    },
    edad: Number,
    contraseña: String 
})

const usuarioModel = mongoose.model(usuarios, usuariosEsquema);

export default usuarioModel;
import config from "../../../config/config.js";
import usuarioModel from "../../../dao/models/usuarios.models.js";
import { validacionContraseña } from "../../../utils.js";


export default class usuariosServisMongo {
    constructor() {
        console.log("usuarios persistiendo en mongo ");
    }

    buscarUsuario = async (email , contraseña) => {
        const user = await usuarioModel.findOne({ email })       
    
        if(!validacionContraseña(user , contraseña)){
            return res.status(401).send({ status: "error", error: "Incorrect credentials" });
        }
    
        if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" });
        console.log("confirmar usuario y contraseña");
        
        /*lo de entrar como admin entiendo q es asi lo q piden , sino no entendi la consegna la verdad  */
        if(user.email == config.ADMIN_EMAIL && contraseña == config.ADMIN_PASSWORD){
            let agregar = await usuarioModel.findOne( {_id : user._id} )
            await usuarioModel.updateOne({ _id:agregar._id}, {$set :{roll : "admin"} }  )
        }
        
        else{
            let agregar = await usuarioModel.findOne( {_id : user._id})
            await usuarioModel.updateOne( {_id:agregar._id}, {$set :{roll : "usuario"} }  )
        }
       return user 
    }

}


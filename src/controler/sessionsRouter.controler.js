import usuarioModel from "../dao/models/usuarios.models.js";
import { validacionContraseña } from "../utils.js";


export const postLoguinUsuario = async(req,res) =>{
    const { email, contraseña } = req.body;
    const user = await usuarioModel.findOne({ email })
    console.log(req.body);

    if(!validacionContraseña(user , contraseña)){
        return res.status(401).send({ status: "error", error: "Incorrect credentials" });
    }

    if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" });
    console.log("confirmar usuario y contraseña");

    if(user.email == "marianoapanelo@gmail.com" && contraseña == 123){
        console.log(user);
        let agregar = await usuarioModel.findOne( {_id : user._id} )
        console.log(agregar);
        await usuarioModel.updateOne({ _id:agregar._id}, {$set :{roll : "admin"} }  )
        console.log(user);
    }
    
    else{
        let agregar = await usuarioModel.findOne( {_id : user._id})
        console.log(user);
        console.log(agregar);
        await usuarioModel.updateOne( {_id:agregar._id}, {$set :{roll : "usuario"} }  )
        console.log(user);
    }
    res.send({ status: "success", payload: user, message: "¡Primer logueo realizado! :)" });
}

export const postRegister = async(req,res) =>{
    console.log("Registrando nuevo usuario.");
    res.status(201).send({ status: "success", message: "Usuario creado con extito." })
}

export const getFailRegister = async(req,res) =>{
    res.status(401).send({ error: "Failed to process register!" });
}


export const getGit = async(req,res) =>{}

export const getGitCollback = async (req, res) => {
    const user = req.user;
    req.session.user = {
        first_name: `${user.username}`,
        email: user.email,
        age: user.age
    };
    console.log(req.session.user);
    req.session.admin = true;
    res.redirect("/api/productos");
}



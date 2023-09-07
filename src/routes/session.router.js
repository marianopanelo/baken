import { Router } from 'express';
import usuarioModel from '../dao/models/usuarios.models.js';

const router = Router();

router.post("/registro", async (req, res) => {
    const { nombre, apellido, email, edad, contraseña } = req.body;
    console.log(req.body);
    console.log("Registrando usuario");
 

    const exists = await usuarioModel.findOne( {email} )
    if (exists) {
        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
    }
    const user = {
        nombre,
        apellido,
        email,
        edad,
        contraseña 
    }
    const result = await usuarioModel.create(user);
    res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id })
});

router.post("/", async (req, res) => {
    const { email, contraseña } = req.body;
    const user = await usuarioModel.findOne({ email, contraseña })
    console.log(req.body);
    console.log("viendo usuario");
    if(user.email == "marianoapanelo@gmail.com" && user.contraseña == 123){
        console.log(user);
        let agregar = await usuarioModel.findOne( {_id : user._id} )
        console.log(agregar);
        await usuarioModel.updateOne({ _id:agregar._id}, {$set :{roll : "admin"} }  )
        console.log(user);
    }else{
        let agregar = await usuarioModel.findOne( {_id : user._id})
        console.log(user);
        console.log(agregar);
        await usuarioModel.updateOne( {_id:agregar._id}, {$set :{roll : "usuario"} }  )
        console.log(user);
    }
    res.send({ status: "success", payload: user, message: "¡Primer logueo realizado! :)" });
});


export default router;
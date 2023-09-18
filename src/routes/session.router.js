import { Router } from 'express';
import usuarioModel from '../dao/models/usuarios.models.js';
import { crearEncriptado, validacionContraseña } from '../utils.js';
import passport from 'passport';


const router = Router();


router.get("/github", passport.authenticate('github', { scope: ['user:email'] }), async (req, res) => {
    
});

router.get("/githubcallback", passport.authenticate('github', { failureRedirect: '/github/error' }), async (req, res) => {
    const user = req.user;
    req.session.user = {
        name: `${user.username}`,
        email: user.email,
        age: user.age
    };
    console.log(req.session.user);
    req.session.admin = true;
    res.redirect("/api/productos");
});

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
        contraseña : crearEncriptado (contraseña)
    }
    const result = await usuarioModel.create(user);
    res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id })
});

router.post("/", async (req, res) => {
    const { email, contraseña } = req.body;
    const user = await usuarioModel.findOne({ email })

    if (!user) return res.status(401).send({ status: "error", error: "Incorrect credentials" });

    if(!validacionContraseña(user , contraseña)){
        return res.status(401).send({ status: "error", error: "Incorrect credentials" });
    }

    if(user.email == "marianoapanelo@gmail.com" && contraseña == 123){
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

router.get("/fail-register", (req, res) => {
    res.status(401).send({ error: "Failed to process register!" });
});

router.get("/fail-login", (req, res) => {
    res.status(401).send({ error: "Failed to process login!" });
});

export default router;
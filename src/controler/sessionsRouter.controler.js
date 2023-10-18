import { usuariosService } from "../services/factory.js";

export const postLoguinUsuario = async(req,res) =>{
    const { email, contraseña } = req.body;
    let ingresarUsuario = await usuariosService.buscarUsuario(email, contraseña)
    //res.send({ status: "success", payload: ingresarUsuario, message: "¡Primer logueo realizado! " });
    res.json(ingresarUsuario)
    console.log(ingresarUsuario);
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



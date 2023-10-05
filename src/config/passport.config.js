import passport from "passport";
import passportLocal from 'passport-local';
import usuarioModel from "../dao/models/usuarios.models.js";
import { crearEncriptado, validacionContraseña } from "../utils.js";

const localStrategy = passportLocal.Strategy


const initializePassport = () => {
    
    passport.use('register', new localStrategy(

        { passReqToCallback: true, usernameField: 'email' },

        async (req, usuarionombre, contraseña, done) => {
        
            const { nombre, apellido, email, edad } = req.body;
                try {
                    const exists = await usuarioModel.findOne( {email} )
                    console.log(exists);
                    if (exists) {
                        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
                    }
                    const user = {
                        nombre,
                        apellido,
                        email,
                        edad,
                        contraseña : crearEncriptado(contraseña)
                    }
                    const result = await usuarioModel.create(user);
                    res.send({ status: "success", message: "Usuario creado con exito con ID: " + result.id })
                    return done(null, result)
            } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))



    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await userModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
}


export default initializePassport;
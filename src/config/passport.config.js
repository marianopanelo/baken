import passport from "passport";
import passportLocal from 'passport-local';
import usuarioModel from "../dao/models/usuarios.models.js";
import { crearEncriptado, validacionContraseña } from "../utils.js";

const localStrategy = passportLocal.Strategy


const initializePassport = () => {
    
    passport.use('register', new localStrategy(

        { passReqToCallback: true, usernameField: 'email' },

        async (req, username, password, done) => {
        
            const { first_name, last_name, email, age } = req.body;
                try {
                    const exists = await usuarioModel.findOne({ email })
                    console.log(exists);
                    if (exists) {
                        return res.status(400).send({ status: 'error', message: 'usuario ya existe' })
                    }
                    const user = {
                        first_name,
                        last_name,
                        email,
                        age,
                        password: crearEncriptado(password)
                    }
                    const result = await usuarioModel.create(user);
                    
                    return done(null, result)
                } catch (error) {
                return done("Error registrando el usuario: " + error);
            }
        }

    ))

    passport.use('login', new localStrategy(
        { passReqToCallback: true, usernameField: 'email' },
        async (req, username, password, done) => {
            try {
                const user = await usuarioModel.findOne({ email: username })
                console.log("Usuario encontrado para login:");
                console.log(user);
                if (!user) {
                    console.warn("User doesn't exists with username: " + username);
                    return done(null, false)
                }
                // Validacion de el password
                if (!validacionContraseña(user, password)) {
                    return done(null, false)
                }
                return done(null, user)
            } catch (error) {
                return done(error)
            }
        }
    ));



    passport.serializeUser((user, done) => {
        done(null, user._id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            let user = await usuarioModel.findById(id);
            done(null, user);
        } catch (error) {
            console.error("Error deserializando el usuario: " + error);
        }
    });
}


export default initializePassport;
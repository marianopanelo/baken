import passport from "passport";
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import usuarioModel from "../dao/models/usuarios.models.js";
import { crearEncriptado, validacionContraseña } from "../utils.js";

const localStrategy = passportLocal.Strategy


const initializePassport = () => {
    passport.use('github', new GitHubStrategy(
        {
            clientID: `Iv1.1b112127a1c852f3`,
            clientSecret : `406c9361909195bb0090fe8174acbf36497d6923`,
            callbackUrl : `http://localhost:8080/api/sessions/githubcallback`
        },
        async (accessToken, refreshToken, profile, done) => {
            console.log("Profile obtenido del usuario: ");
            console.log(profile);
            try {
                const user = await usuarioModel.findOne({ email: profile._json.email })
                console.log("Usuario encontrado para login:");
                console.log(user);

                if (!user) {
                    console.warn("User doesn't exists with username: " + profile._json.email);
                    let user = {
                        first_name: profile._json.username,
                        last_name: '',
                        edad: 18,
                        email: profile._json.email,
                        password: '',
                    }
                    const result = await usuarioModel.create(user)
                    done(null, result)
                }
                else {
                    return done(null, user )
                }
            } catch (error) {
                return done(error)
            }
        }))
    
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
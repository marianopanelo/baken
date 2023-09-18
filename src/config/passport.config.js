import passport from 'passport';
import passportLocal from 'passport-local';
import GitHubStrategy from 'passport-github2';
import usuarioModel from '../dao/models/usuarios.models.js';
import { crearEncriptado, validacionContraseña } from '../utils.js';

const localStrategy = passportLocal.Strategy;

const inicializarPassport = () => {
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
                    let usuario = {
                        nombre: profile._json.username,
                        apellido: '',
                        edad: 18,
                        email: profile._json.email,
                        password: '',
                        loggedBy: "GitHub"
                    }
                    const result = await usuarioModel.create(usuario)
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
            { passReqToCallback: true, usernameField: 'email' }, async (req, username, contraseña, done) => {
                const { nombre, apellido, email, edad } = req.body;
                try {
                    const exists = await usuarioModel.findOne({ email });
                    if (exists) {
                        console.log("El usuario ya existe.");
                        return done(null, false);
                    }
                    const usuario = {
                        nombre,
                        apellido,
                        email,
                        edad,
                        contraseña: crearEncriptado(contraseña),
                        loggedBy: "App"
                    };
                    const result = await usuarioModel.create(usuario);
                    return done(null, result);
                } catch (error) {
                    return done("Error registrando el usuario: " + error);
                }
            }
        ));

        passport.use('login', new localStrategy(
            { passReqToCallback: true, usernameField: 'email' }, async (req, nombre, contraseña, done) => {
                try {
                    const user = await usuarioModel.findOne({ email: nombre });
                    console.log("Usuario encontrado para login:");
                    console.log(user);
                    if (!user) {
                        console.warn("User doesn't exists with username: " + nombre);
                        return done(null, false);
                    }
                    if (!validacionContraseña(user, contraseña)) {
                        console.warn("Invalid credentials for user: " + username);
                        return done(null, false);
                    }
                    return done(null, user);
                } catch (error) {
                    return done(error);
                }
            })
        );

        passport.serializeUser((usuario, done) => {
            done(null, usuario._id);
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

export default inicializarPassport;
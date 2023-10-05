import dotenv from 'dotenv'
import program from '../process.js';

const enviroment = program.opts().mode
console.log("Modo Opt: ", program.opts().mode);

//cambiar esto para q le pegue a las rutas
dotenv.config({
    path: enviroment === 'admin' ? './src/config/.env.admin' : './src/config/.env.production'
})

export default {
    port: process.env.PORT,
    MONGO_URL: process.env.URL_MONGO,
    ADMIN_NAME: process.env.ADMIN_NAME,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD
}
import dotenv from 'dotenv'
import program from '../process.js';


const enviroment = program.opts().mode
console.log("Modo Opt: ", program.opts().mode);

dotenv.config({
    path: enviroment === 'admin' ? './src/config/.env.admin' : './src/config/.env.production'
})

export default {
    port: process.env.PORT,
    MONGO_URL: process.env.MONGO_URL,
    persistence: program.opts().persist,
    ADMIN_EMAIL : process.env.ADMIN_EMAIL ,
    ADMIN_PASSWORD: process.env.ADMIN_PASSWORD, 
    role : process.env.role
}
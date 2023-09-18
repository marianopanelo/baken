import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export const crearEncriptado = contraseña => bcrypt.hashSync(contraseña , bcrypt.genSaltSync(10))

export const validacionContraseña = (usuario , contraseña)=>{
    console.log(`datos a validar: ${usuario.contraseña} ${contraseña}`);
    return bcrypt.compareSync(contraseña , usuario.contraseña)
}


export default __dirname;

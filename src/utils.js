import { fileURLToPath } from 'url';
import { dirname } from 'path';
import bcrypt from 'bcrypt';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename)

export const crearEncriptado = contraseña => bcrypt.hashSync(contraseña , bcrypt.genSaltSync(10))

export const validacionContraseña = (user , password)=>{
    console.log(`datos a validar: ${user.password} ${password}`);
    return bcrypt.compareSync(password , user.password)
}
export default __dirname;
